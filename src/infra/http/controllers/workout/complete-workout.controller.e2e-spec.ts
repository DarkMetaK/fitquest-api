import request from 'supertest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { makePrismaBundle } from '@/infra/database/prisma/factories/utils/make-prisma-bundle'
import { makePrismaBundleSubscription } from '@/infra/database/prisma/factories/utils/make-prisma-bundle-subscription'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaCustomerMetadata } from '@/infra/database/prisma/factories/utils/make-prisma-customer-metadata'
import { makePrismaWorkout } from '@/infra/database/prisma/factories/utils/make-prisma-workout'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

let jwt: JwtEncrypter

describe('Complete workout (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /workouts/:id/complete', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaCustomerMetadata({
      customerId: new UniqueEntityId(user.id),
      currencyAmount: 0,
      experienceAmount: 0,
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
      availableCurrency: 10,
      availableExperience: 10,
    })

    const response = await request(app.server)
      .post(`/workouts/${workout.id}/complete`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    const finishedWorkoutsOnDatabase = await prisma.finishedWorkout.findFirst({
      where: {
        userId: user.id,
      },
    })

    expect(finishedWorkoutsOnDatabase).toBeTruthy()
  })
})
