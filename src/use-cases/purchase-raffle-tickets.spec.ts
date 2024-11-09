import { makeCustomer } from 'test/factories/make-customer'
import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { makeRaffle } from 'test/factories/make-raffle'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'
import { InMemoryCustomersRafflesRepository } from 'test/in-memory/in-memory-customers-raffles-repository'
import { InMemoryCustomersRepository } from 'test/in-memory/in-memory-customers-repository'
import { InMemoryRafflesRepository } from 'test/in-memory/in-memory-raffles-repository'
import { InMemoryStreaksRepository } from 'test/in-memory/in-memory-streaks-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ExpireRaffleError } from '@/core/errors/expired-raffle-error'
import { InsufficientBalanceError } from '@/core/errors/insufficient-balance-error'

import { PurchaseRaffleTicketsUseCase } from './purchase-raffle-tickets'

let sut: PurchaseRaffleTicketsUseCase
let streaksRepository: InMemoryStreaksRepository
let customersRepository: InMemoryCustomersRepository
let customersMetadataRepository: InMemoryCustomersMetadataRepository
let rafflesRepository: InMemoryRafflesRepository
let customerRafflesRepository: InMemoryCustomersRafflesRepository

describe('Use Case: Buy Raffle Tickets', () => {
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

    sut = new PurchaseRaffleTicketsUseCase(
      customersRepository,
      rafflesRepository,
      customerRafflesRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to purchase a certain amount of tickets to draw', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        currencyAmount: 100,
      }),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          price: 10,
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    const { tickets } = await sut.execute({
      customerId: 'customer-1',
      raffleId: 'raffle-1',
      amount: 10,
    })

    expect(tickets).toHaveLength(10)
    expect(customerRafflesRepository.items).toHaveLength(10)
  })

  it('should update the customer balance after purchasing tickets', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        currencyAmount: 110,
      }),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          price: 10,
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    await sut.execute({
      customerId: 'customer-1',
      raffleId: 'raffle-1',
      amount: 10,
    })

    expect(customersMetadataRepository.items[0].currencyAmount).toBe(10)
  })

  it('should not be able to purchase a ticket if the customer does not have enough currency', async () => {
    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        currencyAmount: 5,
      }),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          price: 10,
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    await expect(() =>
      sut.execute({
        customerId: 'customer-1',
        raffleId: 'raffle-1',
        amount: 1,
      }),
    ).rejects.toBeInstanceOf(InsufficientBalanceError)
  })

  it('should not be able to purchase a ticket to a expired raffle', async () => {
    vi.setSystemTime(new Date(2024, 9, 20, 0, 0, 0))

    customersRepository.create(
      makeCustomer({}, new UniqueEntityId('customer-1')),
    )

    customersMetadataRepository.create(
      makeCustomerMetadata({
        customerId: new UniqueEntityId('customer-1'),
        currencyAmount: 10,
      }),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          price: 10,
          expiresAt: new Date(2024, 9, 7, 0, 0, 0),
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    await expect(() =>
      sut.execute({
        customerId: 'customer-1',
        raffleId: 'raffle-1',
        amount: 1,
      }),
    ).rejects.toBeInstanceOf(ExpireRaffleError)
  })
})
