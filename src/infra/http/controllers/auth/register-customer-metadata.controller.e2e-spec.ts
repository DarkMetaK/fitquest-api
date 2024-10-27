import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'

import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

import { app } from '../../app'

let jwt: JwtEncrypter

describe('Register customer metadata (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /customers/metadata', async () => {
    const user = await makePrismaCustomer()
    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
      hasFinishedRegistration: false,
    })

    const response = await request(app.server)
      .post('/customers/metadata')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        phone: '11 99999-9999',
        age: 20,
        weight: 70,
        height: 175,
        goal: 'LOSE_WEIGHT',
      })

    expect(response.statusCode).toEqual(201)

    const metadataOnDatabase = await prisma.customerMetadata.findUnique({
      where: {
        userId: user.id,
      },
    })

    expect(metadataOnDatabase).toBeTruthy()
  })
})
