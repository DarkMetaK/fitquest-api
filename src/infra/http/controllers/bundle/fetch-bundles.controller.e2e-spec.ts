import request from 'supertest'

import { app } from '@/infra/app'
import { makePrismaBundle } from '@/infra/database/prisma/factories/utils/make-prisma-bundle'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Fetch bundles (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /bundles', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaBundle({
      name: 'Bundle 1',
    })

    await makePrismaBundle({
      name: 'Bundle 2',
    })

    const response = await request(app.server)
      .get('/bundles')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.bundles).toHaveLength(2)
  })
})
