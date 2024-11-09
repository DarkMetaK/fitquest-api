import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { Raffle } from '@/entities/raffle'

interface FetchAvailableRafflesUseCaseResponse {
  raffles: Raffle[]
}

export class FetchAvailableRafflesUseCase {
  constructor(private rafflesRepository: RafflesRepository) {}

  async execute(): Promise<FetchAvailableRafflesUseCaseResponse> {
    const raffles = await this.rafflesRepository.findManyNotExpired()

    return {
      raffles,
    }
  }
}
