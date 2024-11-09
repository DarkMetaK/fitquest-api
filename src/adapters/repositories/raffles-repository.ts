import { Raffle } from '@/entities/raffle'

export interface RafflesRepository {
  findById(id: string): Promise<Raffle | null>

  findManyNotExpired(): Promise<Raffle[]>

  create(raffle: Raffle): Promise<void>
}
