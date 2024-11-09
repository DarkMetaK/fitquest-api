import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaCustomerMetadata } from 'test/factories/make-customer-metadata'
import { makePrismaCustomerRaffle } from 'test/factories/make-customer-raffle'
import { makePrismaRaffle } from 'test/factories/make-raffle'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'

let jwt: JwtEncrypter

describe('Fetch current customer raffles (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[GET] /raffles/customer', async () => {
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

    const secondRaffle = await makePrismaRaffle({
      name: 'Raffle 2',
    })

    await makePrismaCustomerRaffle({
      customerId: new UniqueEntityId(user.id),
      raffleId: new UniqueEntityId(firstRaffle.id),
    })

    await makePrismaCustomerRaffle({
      customerId: new UniqueEntityId(user.id),
      raffleId: new UniqueEntityId(firstRaffle.id),
    })

    await makePrismaCustomerRaffle({
      customerId: new UniqueEntityId(user.id),
      raffleId: new UniqueEntityId(secondRaffle.id),
    })

    const response = await request(app.server)
      .get('/raffles/customer')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.tickets).toHaveLength(3)
    expect(response.body).toEqual({
      tickets: expect.arrayContaining([
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
