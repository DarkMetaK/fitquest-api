import { CustomerMetadata } from '@/entities/customer-metadata'

export interface CustomersMetadataRepository {
  findByCustomerId(customerId: string): Promise<CustomerMetadata | null>

  findByPhone(phone: string): Promise<CustomerMetadata | null>

  create(metadata: CustomerMetadata): Promise<void>
}
