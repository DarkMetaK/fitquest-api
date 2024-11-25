import request from 'supertest'

import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaRaffle } from '@/infra/database/prisma/factories/utils/make-prisma-raffle'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get raffle (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /raffles/id', async () => {
    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    const raffle = await makePrismaRaffle({
      name: 'Raffle 1',
    })

    const response = await request(app.server)
      .get(`/raffles/${raffle.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      raffle: expect.objectContaining({
        name: 'Raffle 1',
      }),
    })
  })
})
