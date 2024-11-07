import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaCustomerMetadata } from 'test/factories/make-customer-metadata'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get customer details (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /me/metadata', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaCustomerMetadata({
      customerId: new UniqueEntityId(user.id),
      age: 25,
      height: 180,
    })

    const response = await request(app.server)
      .get('/me/metadata')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      customer: expect.objectContaining({
        age: 25,
        height: 180,
      }),
    })
  })
})
