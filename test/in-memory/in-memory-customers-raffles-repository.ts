import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerRaffle } from '@/entities/customer-raffle'

export class InMemoryCustomersRafflesRepository
  implements CustomersRafflesRepository
{
  public items: CustomerRaffle[] = []

  async findById(id: string): Promise<CustomerRaffle | null> {
    const ticket = this.items.find((ticket) =>
      ticket.id.equals(new UniqueEntityId(id)),
    )

    if (!ticket) {
      return null
    }

    return ticket
  }

  async findManyByCustomerId(customerId: string): Promise<CustomerRaffle[]> {
    const tickets = this.items.filter((ticket) =>
      ticket.customerId.equals(new UniqueEntityId(customerId)),
    )

    return tickets
  }

  async create(customerRaffle: CustomerRaffle): Promise<void> {
    this.items.push(customerRaffle)
  }

  async createMany(customerRaffles: CustomerRaffle[]): Promise<void> {
    this.items.push(...customerRaffles)
  }
}
