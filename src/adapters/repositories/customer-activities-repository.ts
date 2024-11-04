import { CustomerActivity } from '@/entities/customer-activity'

export interface CustomerActivitiesRepository {
  findByCustomerIdAndDate(
    customerId: string,
    date: Date,
  ): Promise<CustomerActivity | null>

  findManyByCustomerIdAndDatePeriod(
    customerId: string,
    from: Date,
    until: Date,
  ): Promise<CustomerActivity[]>

  create(customerActivity: CustomerActivity): Promise<void>
}
