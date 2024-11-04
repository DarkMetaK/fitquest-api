import { StreaksRepository } from '@/adapters/repositories/streaks-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Streak } from '@/entities/streak'

export class InMemoryStreaksRepository implements StreaksRepository {
  public items: Streak[] = []

  async findByCustomerId(customerId: string): Promise<Streak | null> {
    const streak = this.items.find((item) =>
      item.customerId.equals(new UniqueEntityId(customerId)),
    )

    if (!streak) {
      return null
    }

    return streak
  }

  async create(streak: Streak): Promise<void> {
    this.items.push(streak)
  }

  async update(streak: Streak): Promise<void> {
    const streakIndex = this.items.findIndex((item) =>
      item.customerId.equals(streak.customerId),
    )

    this.items[streakIndex] = streak
  }
}
