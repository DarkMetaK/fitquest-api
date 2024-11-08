import { Customer } from '@/entities/customer'
import { CustomerDetails } from '@/entities/value-objects/customer-details'

export type UpdateCustomerDTO = Partial<
  Omit<CustomerDetails, 'customerId' | 'metadataId'>
> & {
  customerId: string
}

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>

  findByIdWithMetadata(id: string): Promise<CustomerDetails | null>

  findByEmail(email: string): Promise<Customer | null>

  findByEmailWithMetadata(email: string): Promise<CustomerDetails | null>

  create(customer: Customer): Promise<void>

  update(customer: UpdateCustomerDTO): Promise<void>
}
