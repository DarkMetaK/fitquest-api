import {
  CustomerMetadata as PrismaMetadata,
  Goal,
  User as PrismaUser,
} from '@prisma/client'

import { CustomerDetails } from '@/entities/value-objects/customer-details'

type PrismaCustomerDetails = PrismaUser & {
  metadata: PrismaMetadata
  highestStreak?: number | null
}

export class PrismaCustomerDetailsMapper {
  static toDomain(raw: PrismaCustomerDetails): CustomerDetails {
    const customer = CustomerDetails.create({
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
      totalCalories: raw.metadata.totalCalories,
      totalExercises: raw.metadata.totalExercises,
      totalWorkouts: raw.metadata.totalWorkouts,
      highestStreak: raw.highestStreak ?? 0,
      premiumExpiresAt: raw.metadata.premiumExpiresAt,
      createdAt: raw.createdAt,
    })

    return customer
  }

  static toPrisma(customer: CustomerDetails): PrismaCustomerDetails {
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
        totalWorkouts: customer.totalWorkouts,
        totalExercises: customer.totalExercises,
        totalCalories: customer.totalCalories,
      },
      createdAt: customer.createdAt,
    }
  }
}
