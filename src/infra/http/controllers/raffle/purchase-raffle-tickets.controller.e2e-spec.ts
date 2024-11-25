import request from 'supertest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaCustomerMetadata } from '@/infra/database/prisma/factories/utils/make-prisma-customer-metadata'
import { makePrismaRaffle } from '@/infra/database/prisma/factories/utils/make-prisma-raffle'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

let jwt: JwtEncrypter

describe('Purchase raffle tickets (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[POST] /raffles/:id/purchase', async () => {
    vi.setSystemTime(new Date(2024, 9, 30, 0, 0, 0))

    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaCustomerMetadata({
      customerId: new UniqueEntityId(user.id),
      currencyAmount: 100,
    })

    const raffle = await makePrismaRaffle({
      name: 'Raffle 1',
      expiresAt: new Date(2024, 10, 10, 0, 0, 0),
      price: 10,
    })

    const response = await request(app.server)
      .post(`/raffles/${raffle.id}/purchase`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ amount: 10 })
      .send()

    expect(response.statusCode).toEqual(201)

    const ticketsOnDatabase = await prisma.customerRaffle.findMany({
      where: {
        customerId: user.id,
        raffleId: raffle.id,
      },
    })

    expect(ticketsOnDatabase).toHaveLength(10)
  })
})
