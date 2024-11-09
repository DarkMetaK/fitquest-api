import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { Raffle } from '@/entities/raffle'

interface FetchAvailableRafflesResponse {
  raffles: Raffle[]
}

export class FetchAvailableRaffles {
  constructor(private rafflesRepository: RafflesRepository) {}

  async execute(): Promise<FetchAvailableRafflesResponse> {
    const raffles = await this.rafflesRepository.findManyNotExpired()

    return {
      raffles,
    }
  }
}
