import {
  CustomerMetadata as PrismaMetadata,
  Goal,
  User as PrismaUser,
} from '@prisma/client'

import { CustomerWithMetadata } from '@/entities/value-objects/customer-with-metadata'

type PrismaCustomerWithMetadata = PrismaUser & {
  metadata: PrismaMetadata
}

export class PrismaCustomerWithMetadataMapper {
  static toDomain(raw: PrismaCustomerWithMetadata): CustomerWithMetadata {
    const customer = CustomerWithMetadata.create({
      customerId: raw.id,
      name: raw.name,
      email: raw.email,
      passwordHash: raw.passwordHash,
      metadataId: raw.metadata.id,
      phone: raw.metadata.phone,
      age: raw.metadata.age,
      weight: raw.metadata.weight,
      height: raw.metadata.height,
      goal: raw.metadata.goal,
      weeklyStreakGoal: raw.metadata.weeklyStreakGoal,
      experienceAmount: raw.metadata.experienceAmount,
      currencyAmount: raw.metadata.currencyAmount,
      premiumExpiresAt: raw.metadata.premiumExpiresAt,
      createdAt: raw.createdAt,
    })

    return customer
  }

  static toPrisma(customer: CustomerWithMetadata): PrismaCustomerWithMetadata {
    return {
      id: customer.customerId, // Verify if id from metadata is the same from user!!
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash ?? null,
      metadata: {
        id: customer.metadataId,
        userId: customer.customerId,
        phone: customer.phone,
        age: customer.age,
        weight: customer.weight,
        height: customer.height,
        goal: Goal[customer.goal as keyof typeof Goal],
        weeklyStreakGoal: customer.weeklyStreakGoal,
        experienceAmount: customer.experienceAmount,
        currencyAmount: customer.currencyAmount,
        premiumExpiresAt: customer.premiumExpiresAt ?? null,
      },
      createdAt: customer.createdAt,
    }
  }
}
