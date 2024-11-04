import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { CustomerActivitiesRepository } from '@/adapters/repositories/customer-activities-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerActivity } from '@/entities/customer-activity'

dayjs.extend(isBetween)

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

  async findManyByCustomerIdAndDatePeriod(
    customerId: string,
    from: Date,
    until: Date,
  ): Promise<CustomerActivity[]> {
    const activities = this.items.filter(
      (activity) =>
        activity.customerId.equals(new UniqueEntityId(customerId)) &&
        dayjs(activity.date).isBetween(from, until, undefined, '[]'),
    )

    return activities
  }

  async create(customerActivity: CustomerActivity): Promise<void> {
    this.items.push(customerActivity)
  }
}
