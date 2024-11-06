import { CustomerActivitiesRepository } from '@/adapters/repositories/customer-activities-repository'
import { CustomerActivity } from '@/entities/customer-activity'
import { prisma } from '@/infra/libs/prisma'

import { PrismaCustomerActivityMapper } from '../mappers/prisma-customer-activity-mapper'

export class PrismaCustomerActivitiesRepository
  implements CustomerActivitiesRepository
{
  async findByCustomerIdAndDate(
    customerId: string,
    date: Date,
  ): Promise<CustomerActivity | null> {
    const activity = await prisma.userActivity.findFirst({
      where: { userId: customerId, date },
    })

    if (!activity) {
      return null
    }

    return PrismaCustomerActivityMapper.toDomain(activity)
  }

  async findManyByCustomerIdAndDatePeriod(
    customerId: string,
    from: Date,
    until: Date,
  ): Promise<CustomerActivity[]> {
    const activities = await prisma.userActivity.findMany({
      where: {
        userId: customerId,
        date: {
          gte: from,
          lte: until,
        },
      },
    })

    return activities.map(PrismaCustomerActivityMapper.toDomain)
  }

  async create(customerActivity: CustomerActivity): Promise<void> {
    const data = PrismaCustomerActivityMapper.toPrisma(customerActivity)

    await prisma.userActivity.create({
      data,
    })
  }
}
