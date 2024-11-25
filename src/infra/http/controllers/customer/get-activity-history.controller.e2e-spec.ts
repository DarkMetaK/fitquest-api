import request from 'supertest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaCustomerActivity } from '@/infra/database/prisma/factories/utils/make-prisma-customer-activity'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get customer activities history (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /activities', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    for (let i = 0; i < 30; i++) {
      await makePrismaCustomerActivity({
        activityType: i % 2 === 0 ? 'STREAK' : 'REST',
        customerId: new UniqueEntityId(user.id),
      })
    }

    const response = await request(app.server)
      .get('/activities')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.activities.data).toHaveLength(30)
  })
})
