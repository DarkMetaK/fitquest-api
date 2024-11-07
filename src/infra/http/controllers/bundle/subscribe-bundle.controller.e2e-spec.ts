import request from 'supertest'
import { makePrismaBundle } from 'test/factories/make-bundle'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaCustomerMetadata } from 'test/factories/make-customer-metadata'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

let jwt: JwtEncrypter

describe('Subscribe bundle (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /bundles/:bundleId/subscribe', async () => {
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

    const bundle = await makePrismaBundle({
      name: 'Bundle 1',
      isPremium: false,
    })

    const response = await request(app.server)
      .post(`/bundles/${bundle.id}/subscribe`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    const subscriptionOnDatabase = await prisma.bundleSubscription.findFirst({
      where: {
        userId: user.id,
      },
    })

    expect(subscriptionOnDatabase).toBeTruthy()
  })
})
