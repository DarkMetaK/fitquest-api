import request from 'supertest'
import { makePrismaBundle } from 'test/factories/make-bundle'
import { makePrismaCustomer } from 'test/factories/make-customer'

import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

import { app } from '../../app'

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

    const bundle = await makePrismaBundle({
      name: 'Bundle 1',
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
