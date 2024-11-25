import request from 'supertest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { makePrismaCustomer } from '@/infra/database/prisma/factories/utils/make-prisma-customer'
import { makePrismaCustomerMetadata } from '@/infra/database/prisma/factories/utils/make-prisma-customer-metadata'
import { makePrismaCustomerRaffle } from '@/infra/database/prisma/factories/utils/make-prisma-customer-raffle'
import { makePrismaRaffle } from '@/infra/database/prisma/factories/utils/make-prisma-raffle'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Get customer raffle ticket (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[GET] /raffles/tickets/:ticketId', async () => {
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
    })

    const firstRaffle = await makePrismaRaffle({
      name: 'Raffle 1',
    })

    const ticket = await makePrismaCustomerRaffle({
      customerId: new UniqueEntityId(user.id),
      raffleId: new UniqueEntityId(firstRaffle.id),
    })

    const response = await request(app.server)
      .get(`/raffles/tickets/${ticket.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      ticket: expect.objectContaining({
        name: 'Raffle 1',
      }),
    })
  })
})
