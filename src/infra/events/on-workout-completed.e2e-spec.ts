import request from 'supertest'
import { makePrismaBundle } from 'test/factories/make-bundle'
import { makePrismaBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaCustomerMetadata } from 'test/factories/make-customer-metadata'
import { makePrismaWorkout } from 'test/factories/make-workout'
import { waitFor } from 'test/utils/waitFor'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvents } from '@/core/events/domain-events'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

import { app } from '../app'

let jwt: JwtEncrypter

describe('Event: On workout completed (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    DomainEvents.shouldRun = true

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should create a streak activity when customer finish a workout', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaCustomerMetadata({
      customerId: new UniqueEntityId(user.id),
    })

    const bundle = await makePrismaBundle()

    await makePrismaBundleSubscription({
      customerId: new UniqueEntityId(user.id),
      bundleId: new UniqueEntityId(bundle.id),
    })

    const workout = await makePrismaWorkout({
      name: 'Workout 1',
      type: 'STANDARD',
      bundleId: new UniqueEntityId(bundle.id),
    })

    const response = await request(app.server)
      .post(`/workouts/${workout.id}/complete`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    await waitFor(async () => {
      const activityOnDatabase = await prisma.userActivity.findFirst({
        where: {
          userId: user.id,
        },
      })

      expect(activityOnDatabase).toBeTruthy()
    })
  })
})
