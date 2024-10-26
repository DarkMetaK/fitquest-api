import {
  CustomerMetadata as PrismaMetadata,
  Goal,
  User as PrismaUser,
} from '@prisma/client'

import { CustomerWithMetadata } from '@/entities/value-objects/customer-with-metadata'

type PrismaCustomerWithMetadata = PrismaUser & {
  metadata?: PrismaMetadata
}

export class PrismaCustomerWithMetadataMapper {
  static toDomain(raw: PrismaCustomerWithMetadata): CustomerWithMetadata {
    const customer = CustomerWithMetadata.create({
      customerId: raw.id,
      name: raw.name,
      email: raw.email,
      passwordHash: raw.passwordHash,
      metadata: raw.metadata && {
        metadataId: raw.metadata.id,
        phone: raw.metadata.phone,
        age: raw.metadata.age,
        weight: raw.metadata.weight,
        height: raw.metadata.height,
        goal: raw.metadata.goal,
        experienceAmount: raw.metadata.experienceAmount,
        currencyAmount: raw.metadata.currencyAmount,
        premiumExpiresAt: raw.metadata.premiumExpiresAt,
      },
      createdAt: raw.createdAt,
    })

    return customer
  }

  static toPrisma(customer: CustomerWithMetadata): PrismaCustomerWithMetadata {
    return {
      id: customer.customerId,
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash ?? null,
      metadata: customer.metadata && {
        id: customer.metadata.metadataId,
        userId: customer.customerId,
        phone: customer.metadata.phone,
        age: customer.metadata.age,
        weight: customer.metadata.weight,
        height: customer.metadata.height,
        goal: customer.metadata.goal as Goal,
        experienceAmount: customer.metadata.experienceAmount,
        currencyAmount: customer.metadata.currencyAmount,
        premiumExpiresAt: customer.metadata.premiumExpiresAt ?? null,
      },
      createdAt: customer.createdAt,
    }
  }
}
