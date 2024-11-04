import { CustomerActivitiesRepository } from '@/adapters/repositories/customer-activities-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerActivity } from '@/entities/customer-activity'

export class InMemoryCustomerActivitiesRepository
  implements CustomerActivitiesRepository
{
  public items: CustomerActivity[] = []

  async findByCustomerIdAndDate(
    customerId: string,
    date: Date,
  ): Promise<CustomerActivity | null> {
    const activity = this.items.find(
      (item) =>
        item.customerId.equals(new UniqueEntityId(customerId)) &&
        item.date.toISOString() === date.toISOString(),
    )

    if (!activity) {
      return null
    }

    return activity
  }

  async create(customerActivity: CustomerActivity): Promise<void> {
    this.items.push(customerActivity)
  }
}
