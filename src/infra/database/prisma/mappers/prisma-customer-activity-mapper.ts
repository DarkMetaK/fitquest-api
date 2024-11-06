import {
  ActivityType,
  Prisma,
  UserActivity as PrismaCustomerActivity,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerActivity } from '@/entities/customer-activity'

export class PrismaCustomerActivityMapper {
  static toDomain(raw: PrismaCustomerActivity): CustomerActivity {
    const activity = CustomerActivity.create(
      {
        activityType: raw.activityType,
        customerId: new UniqueEntityId(raw.userId),
        date: raw.date,
      },
      new UniqueEntityId(raw.id),
    )

    return activity
  }

  static toPrisma(
    activity: CustomerActivity,
  ): Prisma.UserActivityUncheckedCreateInput {
    return {
      id: activity.id.toString(),
      userId: activity.customerId.toString(),
      activityType:
        ActivityType[activity.activityType as keyof typeof ActivityType],
      date: activity.date,
    }
  }
}
