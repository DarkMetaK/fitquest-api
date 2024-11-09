import { CustomerRaffle } from '@/entities/customer-raffle'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'

export interface CustomersRafflesRepository {
  findById(id: string): Promise<CustomerRaffle | null>

  findByIdWithDetails(id: string): Promise<CustomerRaffleTicket | null>

  findManyByCustomerId(customerId: string): Promise<CustomerRaffle[]>

  findManyByCustomerIdWithDetails(
    customerId: string,
  ): Promise<CustomerRaffleTicket[]>

  create(customerRaffle: CustomerRaffle): Promise<void>

  createMany(customerRaffles: CustomerRaffle[]): Promise<void>
}
