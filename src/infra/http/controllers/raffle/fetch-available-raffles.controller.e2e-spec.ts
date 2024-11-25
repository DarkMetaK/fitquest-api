import request from 'supertest'

import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaRaffle } from '@/infra/database/prisma/factories/utils/make-prisma-raffle'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Fetch available raffles (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[GET] /raffles/active', async () => {
    vi.setSystemTime(new Date(2024, 9, 30, 0, 0, 0))

    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaRaffle({
      name: 'Expired raffle',
      expiresAt: new Date(2024, 9, 29, 0, 0, 0),
    })

    await makePrismaRaffle({
      name: 'Raffle 1',
      expiresAt: new Date(2024, 10, 10, 0, 0, 0),
    })

    await makePrismaRaffle({
      name: 'Raffle 2',
      expiresAt: new Date(2024, 10, 15, 0, 0, 0),
    })

    const response = await request(app.server)
      .get('/raffles/active')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.raffles).toHaveLength(2)
    expect(response.body).toEqual({
      raffles: expect.arrayContaining([
        expect.objectContaining({
          name: 'Raffle 1',
        }),
        expect.objectContaining({
          name: 'Raffle 2',
        }),
      ]),
    })
  })
})
