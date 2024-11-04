import { Streak } from '@/entities/streak'

export interface StreaksRepository {
  findByCustomerId(customerId: string): Promise<Streak | null>

  create(streak: Streak): Promise<void>

  update(streak: Streak): Promise<void>
}
