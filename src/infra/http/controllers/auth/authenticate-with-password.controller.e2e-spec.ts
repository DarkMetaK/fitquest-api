import { hash } from 'bcryptjs'
import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'

import { app } from '@/infra/app'

describe('Authenticate with password (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /sessions/password', async () => {
    await makePrismaCustomer({
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 8),
    })

    const response = await request(app.server).post('/sessions/password').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
      hasFinishedRegistration: false,
    })
  })
})
