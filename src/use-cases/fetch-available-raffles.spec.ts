import { makeRaffle } from 'test/factories/make-raffle'
import { InMemoryRafflesRepository } from 'test/in-memory/in-memory-raffles-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { FetchAvailableRafflesUseCase } from './fetch-available-raffles'

let sut: FetchAvailableRafflesUseCase
let rafflesRepository: InMemoryRafflesRepository

describe('Use Case: Fetch Available Raffles', () => {
  beforeEach(async () => {
    rafflesRepository = new InMemoryRafflesRepository()

    sut = new FetchAvailableRafflesUseCase(rafflesRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch all raffles that are not expired', async () => {
    vi.setSystemTime(new Date(2024, 9, 20, 0, 0, 0))

    rafflesRepository.create(
      makeRaffle(
        {
          name: 'Expired raffle',
          expiresAt: new Date(2024, 9, 7, 0, 0, 0),
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          name: 'Raffle 1',
          expiresAt: new Date(2024, 9, 21, 0, 0, 0),
        },
        new UniqueEntityId('raffle-2'),
      ),
    )

    rafflesRepository.create(
      makeRaffle(
        {
          name: 'Raffle 2',
          expiresAt: new Date(2024, 10, 21, 0, 0, 0),
        },
        new UniqueEntityId('raffle-3'),
      ),
    )

    const { raffles } = await sut.execute()

    expect(raffles).toHaveLength(2)

    expect(raffles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Raffle 1',
        }),
        expect.objectContaining({
          name: 'Raffle 2',
        }),
      ]),
    )
  })
})
