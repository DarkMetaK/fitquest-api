import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Raffle } from '@/entities/raffle'

interface GetRaffleUseCaseRequest {
  raffleId: string
}

interface GetRaffleUseCaseResponse {
  raffle: Raffle
}

export class GetRaffleUseCase {
  constructor(private rafflesRepository: RafflesRepository) {}

  async execute({
    raffleId,
  }: GetRaffleUseCaseRequest): Promise<GetRaffleUseCaseResponse> {
    const raffle = await this.rafflesRepository.findById(raffleId)

    if (!raffle) {
      throw new ResourceNotFoundError(raffleId)
    }

    return {
      raffle,
    }
  }
}
