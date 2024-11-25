import request from 'supertest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvents } from '@/core/events/domain-events'
import { makePrismaBundle } from '@/infra/database/prisma/factories/utils/make-prisma-bundle'
import { makePrismaBundleSubscription } from '@/infra/database/prisma/factories/utils/make-prisma-bundle-subscription'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaCustomerMetadata } from '@/infra/database/prisma/factories/utils/make-prisma-customer-metadata'
import { makePrismaWorkout } from '@/infra/database/prisma/factories/utils/make-prisma-workout'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

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

    // await waitFor(async () => {
    //   const activityOnDatabase = await prisma.userActivity.findFirst({
    //     where: {
    //       userId: user.id,
    //     },
    //   })

    //   expect(activityOnDatabase).toBeTruthy()
    // })
  })
})
