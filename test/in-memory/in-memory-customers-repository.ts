import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Customer } from '@/entities/customer'
import { CustomerMetadata } from '@/entities/customer-metadata'
import { CustomerWithMetadata } from '@/entities/value-objects/customer-with-metadata'

import { CustomersRepository } from '../../src/adapters/repositories/customers-repository'
import { InMemoryCustomersMetadataRepository } from './in-memory-customers-metadata-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  constructor(
    private metadataRepository: InMemoryCustomersMetadataRepository,
  ) {}

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByIdWithMetadata(id: string): Promise<CustomerWithMetadata | null> {
    const customer = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!customer) {
      return null
    }

    const metadata = this.metadataRepository.items.find((item) =>
      item.customerId.equals(new UniqueEntityId(id)),
    )

    return CustomerWithMetadata.create({
      customerId: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash,
      metadata: metadata && {
        metadataId: metadata.id.toString(),
        phone: metadata.phone,
        age: metadata.age,
        weight: metadata.weight,
        height: metadata.height,
        goal: metadata.goal,
        experienceAmount: metadata.experienceAmount,
        currencyAmount: metadata.currencyAmount,
        premiumExpiresAt: metadata.premiumExpiresAt,
      },
      createdAt: customer.createdAt,
    })
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmailWithMetadata(
    email: string,
  ): Promise<CustomerWithMetadata | null> {
    const customer = this.items.find((item) => item.email === email)

    if (!customer) {
      return null
    }

    const metadata = this.metadataRepository.items.find((item) =>
      item.customerId.equals(customer.id),
    )

    return CustomerWithMetadata.create({
      customerId: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash,
      metadata: metadata && {
        metadataId: metadata.id.toString(),
        phone: metadata.phone,
        age: metadata.age,
        weight: metadata.weight,
        height: metadata.height,
        goal: metadata.goal,
        experienceAmount: metadata.experienceAmount,
        currencyAmount: metadata.currencyAmount,
        premiumExpiresAt: metadata.premiumExpiresAt,
      },
      createdAt: customer.createdAt,
    })
  }

  async findByPhone(phone: string): Promise<CustomerWithMetadata | null> {
    const metadata = this.metadataRepository.items.find(
      (item) => item.phone === phone,
    )

    if (!metadata) {
      return null
    }

    const customer = this.items.find((item) =>
      item.id.equals(metadata.customerId),
    )

    if (!customer) {
      throw new Error(
        `Customer with phone "${phone}" does not exist in the database.`,
      )
    }

    return CustomerWithMetadata.create({
      customerId: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      passwordHash: customer.passwordHash,
      metadata: metadata && {
        metadataId: metadata.id.toString(),
        phone: metadata.phone,
        age: metadata.age,
        weight: metadata.weight,
        height: metadata.height,
        goal: metadata.goal,
        experienceAmount: metadata.experienceAmount,
        currencyAmount: metadata.currencyAmount,
        premiumExpiresAt: metadata.premiumExpiresAt,
      },
      createdAt: customer.createdAt,
    })
  }

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }

  async update(customer: CustomerWithMetadata): Promise<void> {
    const customerId = new UniqueEntityId(customer.customerId)

    const customerIndex = this.items.findIndex((item) =>
      item.id.equals(customerId),
    )

    this.items[customerIndex] = Customer.create(
      {
        name: customer.name,
        email: customer.email,
        passwordHash: customer.passwordHash,
        createdAt: customer.createdAt,
      },
      customerId,
    )

    const metadataIndex = this.metadataRepository.items.findIndex((item) =>
      item.customerId.equals(customerId),
    )

    if (metadataIndex === -1 && customer.metadata) {
      this.metadataRepository.items.push(
        CustomerMetadata.create({
          customerId,
          phone: customer.metadata.phone,
          age: customer.metadata.age,
          weight: customer.metadata.weight,
          height: customer.metadata.height,
          goal: customer.metadata.goal,
          experienceAmount: customer.experienceAmount,
          currencyAmount: customer.currencyAmount,
          premiumExpiresAt: customer.premiumExpiresAt,
        }),
      )

      return
    }

    if (metadataIndex >= 0 && customer.metadata) {
      this.metadataRepository.items[metadataIndex] = CustomerMetadata.create({
        customerId,
        phone: customer.metadata.phone,
        age: customer.metadata.age,
        weight: customer.metadata.weight,
        height: customer.metadata.height,
        goal: customer.metadata.goal,
        experienceAmount: customer.experienceAmount,
        currencyAmount: customer.currencyAmount,
        premiumExpiresAt: customer.premiumExpiresAt,
      })
    }
  }
}
