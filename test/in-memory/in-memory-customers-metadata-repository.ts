import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerMetadata } from '@/entities/customer-metadata'

import { CustomersMetadataRepository } from '../../src/adapters/repositories/customers-metadata-repository'

export class InMemoryCustomersMetadataRepository
  implements CustomersMetadataRepository
{
  public items: CustomerMetadata[] = []

  async findByCustomerId(customerId: string): Promise<CustomerMetadata | null> {
    const metadata = this.items.find((item) =>
      item.customerId.equals(new UniqueEntityId(customerId)),
    )

    if (!metadata) {
      return null
    }

    return metadata
  }

  async create(metadata: CustomerMetadata): Promise<void> {
    this.items.push(metadata)
  }
}
