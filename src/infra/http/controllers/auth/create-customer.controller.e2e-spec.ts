import request from 'supertest'

import { app } from '@/infra/app'
import { prisma } from '@/infra/libs/prisma'

describe('Create customer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /customers', async () => {
    const response = await request(app.server).post('/customers').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
