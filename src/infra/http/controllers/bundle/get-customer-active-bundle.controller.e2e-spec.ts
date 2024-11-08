import request from 'supertest'
import { makePrismaBundle } from 'test/factories/make-bundle'
import { makePrismaBundleSubscription } from 'test/factories/make-bundle-subscription'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaFinishedWorkout } from 'test/factories/make-finished-workout'
import { makePrismaWorkout } from 'test/factories/make-workout'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get customer active bundle (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /bundles/in-progress', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    const bundle = await makePrismaBundle({
      name: 'Bundle 1',
    })

    await makePrismaBundleSubscription({
      customerId: new UniqueEntityId(user.id),
      bundleId: new UniqueEntityId(bundle.id),
    })

    const firstWorkout = await makePrismaWorkout({
      bundleId: new UniqueEntityId(bundle.id),
      name: 'Workout 1',
      type: 'STANDARD',
    })

    await makePrismaWorkout({
      bundleId: new UniqueEntityId(bundle.id),
      name: 'Workout 2',
      type: 'STANDARD',
    })

    await makePrismaFinishedWorkout({
      userId: new UniqueEntityId(user.id),
      workoutId: new UniqueEntityId(firstWorkout.id),
    })

    const response = await request(app.server)
      .get('/bundles/in-progress')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.activeBundle).toEqual(
      expect.objectContaining({
        name: 'Bundle 1',
        finishedWorkoutsIds: expect.arrayContaining([
          firstWorkout.id.toString(),
        ]),
      }),
    )
  })
})
