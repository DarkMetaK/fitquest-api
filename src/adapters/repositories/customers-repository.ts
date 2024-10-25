import { Customer } from '@/entities/customer'
import { CustomerWithMetadata } from '@/entities/value-objects/customer-with-metadata'

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>

  findByIdWithMetadata(id: string): Promise<CustomerWithMetadata | null>

  findByEmail(email: string): Promise<Customer | null>

  findByEmailWithMetadata(email: string): Promise<CustomerWithMetadata | null>

  findByPhone(phone: string): Promise<CustomerWithMetadata | null>

  create(customer: Customer): Promise<void>

  update(customer: CustomerWithMetadata): Promise<void>
}
