import { CustomerRaffle } from '@/entities/customer-raffle'

export interface CustomersRafflesRepository {
  findById(id: string): Promise<CustomerRaffle | null>

  findManyByCustomerId(customerId: string): Promise<CustomerRaffle[]>

  create(customerRaffle: CustomerRaffle): Promise<void>

  createMany(customerRaffles: CustomerRaffle[]): Promise<void>
}
