import { RafflesRepository } from '@/adapters/repositories/raffles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Raffle } from '@/entities/raffle'

export class InMemoryRafflesRepository implements RafflesRepository {
  public items: Raffle[] = []

  async findById(id: string): Promise<Raffle | null> {
    const raffle = this.items.find((raffle) =>
      raffle.id.equals(new UniqueEntityId(id)),
    )

    if (!raffle) {
      return null
    }

    return raffle
  }

  async create(raffle: Raffle): Promise<void> {
    this.items.push(raffle)
  }
}
