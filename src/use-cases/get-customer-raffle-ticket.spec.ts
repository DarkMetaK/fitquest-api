import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerRaffle } from 'test/factories/make-customer-raffle'
import { makeRaffle } from 'test/factories/make-raffle'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRafflesRepository } from 'test/in-memory/in-memory-customers-raffles-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryRafflesRepository } from 'test/in-memory/in-memory-raffles-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from '@/core/errors/unauthorized-error'

import { GetCustomerRaffleTicketUseCase } from './get-customer-raffle-ticket'

let sut: GetCustomerRaffleTicketUseCase
let streaksRepository: InMemoryStreaksRepository
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let rafflesRepository: InMemoryRafflesRepository
let customerRafflesRepository: InMemoryCustomersRafflesRepository

describe('Use Case: Get Customer Raffle Ticket', () => {
  beforeEach(async () => {
    streaksRepository = new InMemoryStreaksRepository()
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    customersRepository = new InMemoryCustomersRepository(
      customersMetadataRepository,
      streaksRepository,
    )
    rafflesRepository = new InMemoryRafflesRepository()
    customerRafflesRepository = new InMemoryCustomersRafflesRepository()

    sut = new GetCustomerRaffleTicketUseCase(
      rafflesRepository,
      customerRafflesRepository,
    )
  })

  it('should be able to get customer raffle ticket details', async () => {
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

    const { ticket } = await sut.execute({
      customerId: 'customer-1',
      ticketId: 'ticket-1',
    })

    expect(ticket).toEqual(
      expect.objectContaining({
        name: 'Raffle 1',
        price: 10,
        hasWon: null,
      }),
    )
  })

  it('should not be able to get another customer raffle ticket details', async () => {
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

    await expect(() =>
      sut.execute({
        customerId: 'customer-2',
        ticketId: 'ticket-1',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
