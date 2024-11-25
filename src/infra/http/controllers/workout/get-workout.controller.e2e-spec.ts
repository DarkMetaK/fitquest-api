import request from 'supertest'

import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaWorkout } from '@/infra/database/prisma/factories/utils/make-prisma-workout'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get workout (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /workouts/:id', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    const workout = await makePrismaWorkout({
      name: 'Random Workout',
    })

    const response = await request(app.server)
      .get(`/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      workout: expect.objectContaining({
        name: 'Random Workout',
      }),
    })
  })
})
