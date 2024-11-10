import { makeRaffle } from 'test/factories/make-raffle'
import { InMemoryRafflesRepository } from 'test/in-memory/in-memory-raffles-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetRaffleUseCase } from './get-raffle'

let sut: GetRaffleUseCase
let rafflesRepository: InMemoryRafflesRepository

describe('Use Case: Get Raffle', () => {
  beforeEach(async () => {
    rafflesRepository = new InMemoryRafflesRepository()

    sut = new GetRaffleUseCase(rafflesRepository)
  })

  it('should be able to get a raffle by id', async () => {
    rafflesRepository.create(
      makeRaffle(
        {
          name: 'Raffle 1',
          expiresAt: new Date(2024, 9, 21, 0, 0, 0),
        },
        new UniqueEntityId('raffle-1'),
      ),
    )

    const { raffle } = await sut.execute({ raffleId: 'raffle-1' })

    expect(raffle).toEqual(
      expect.objectContaining({
        name: 'Raffle 1',
      }),
    )
  })
})
