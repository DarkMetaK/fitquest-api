import {
  CustomerMetadata as PrismaCustomerMetadata,
  Goal,
  Prisma,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerMetadata } from '@/entities/customer-metadata'

export class PrismaCustomerMetadataMapper {
  static toDomain(raw: PrismaCustomerMetadata): CustomerMetadata {
    const customerMetadata = CustomerMetadata.create(
      {
        customerId: new UniqueEntityId(raw.userId),
        phone: raw.phone,
        age: raw.age,
        weight: raw.weight,
        height: raw.height,
        goal: raw.goal,
        weeklyStreakGoal: raw.weeklyStreakGoal,
        currencyAmount: raw.currencyAmount,
        experienceAmount: raw.experienceAmount,
        premiumExpiresAt: raw.premiumExpiresAt,
      },
      new UniqueEntityId(raw.id),
    )

    return customerMetadata
  }

  static toPrisma(
    customerMetadata: CustomerMetadata,
  ): Prisma.CustomerMetadataUncheckedCreateInput {
    return {
      id: customerMetadata.id.toString(),
      userId: customerMetadata.customerId.toString(),
      phone: customerMetadata.phone,
      age: customerMetadata.age,
      height: customerMetadata.height,
      weight: customerMetadata.weight,
      goal: Goal[customerMetadata.goal as keyof typeof Goal],
      weeklyStreakGoal: customerMetadata.weeklyStreakGoal,
      currencyAmount: customerMetadata.currencyAmount,
      experienceAmount: customerMetadata.experienceAmount,
      premiumExpiresAt: customerMetadata.premiumExpiresAt,
    }
  }
}
