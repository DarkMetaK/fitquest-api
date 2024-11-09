import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerRaffle } from 'test/factories/make-customer-raffle'
import { makeRaffle } from 'test/factories/make-raffle'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRafflesRepository } from 'test/in-memory/in-memory-customers-raffles-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryRafflesRepository } from 'test/in-memory/in-memory-raffles-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { FetchCustomerRafflesTicketsUseCase } from './fetch-customer-raffles-tickets'

let sut: FetchCustomerRafflesTicketsUseCase
let streaksRepository: InMemoryStreaksRepository
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let rafflesRepository: InMemoryRafflesRepository
let customerRafflesRepository: InMemoryCustomersRafflesRepository

describe('Use Case: Fetch Customer Raffles Tickets', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    rafflesRepository = new InMemoryRafflesRepository()
    customerRafflesRepository = new InMemoryCustomersRafflesRepository(
      rafflesRepository,
    )

    sut = new FetchCustomerRafflesTicketsUseCase(customerRafflesRepository)
  })

  it('should be able to get all raffle tickets from customer', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          name: 'Raffle 1',
          price: 10,
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    customerRafflesRepository.create(
      makeCustomerRaffle(
        {
          customerId: new UniqueEntityId('customer-1'),
          raffleId: new UniqueEntityId('raffle-1'),
        },
        new UniqueEntityId('ticket-1'),
      ),
    )

    customerRafflesRepository.create(
      makeCustomerRaffle(
        {
          customerId: new UniqueEntityId('customer-1'),
          raffleId: new UniqueEntityId('raffle-1'),
        },
        new UniqueEntityId('ticket-1'),
      ),
    )

    const { tickets } = await sut.execute({
      customerId: 'customer-1',
    })

    expect(tickets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Raffle 1',
          price: 10,
          hasWon: null,
        }),
      ]),
    )
  })
})
