import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaWorkout } from 'test/factories/make-workout'

import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

import { app } from '../../app'

let jwt: JwtEncrypter

describe('Get active challenges (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[GET] /challenges', async () => {
    vi.setSystemTime(new Date(2024, 9, 30, 0, 0, 0))

    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaWorkout({
      name: 'Active challenge',
      type: 'CHALLENGE',
      expiresAt: new Date(2024, 9, 31, 0, 0, 0),
    })

    await makePrismaWorkout({
      type: 'CHALLENGE',
      expiresAt: null,
    })

    await makePrismaWorkout({
      type: 'STANDARD',
    })

    const response = await request(app.server)
      .get('/challenges')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      challenges: [
        expect.objectContaining({
          name: 'Active challenge',
        }),
      ],
    })
    expect(response.body.challenges).toHaveLength(1)
  })
})
