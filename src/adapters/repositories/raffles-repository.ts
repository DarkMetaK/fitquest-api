import { Raffle } from '@/entities/raffle'

export interface RafflesRepository {
  findById(id: string): Promise<Raffle | null>

  create(raffle: Raffle): Promise<void>
}
