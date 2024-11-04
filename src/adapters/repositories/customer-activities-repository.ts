import { CustomerActivity } from '@/entities/customer-activity'

export interface CustomerActivitiesRepository {
  findByCustomerIdAndDate(
    customerId: string,
    date: Date,
  ): Promise<CustomerActivity | null>

  create(customerActivity: CustomerActivity): Promise<void>
}
