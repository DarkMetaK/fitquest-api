import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'

import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get current customer (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /me', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      customer: expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    })
  })
})
