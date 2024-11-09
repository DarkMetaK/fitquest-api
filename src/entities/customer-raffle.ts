import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CustomerRaffleProps {
  customerId: UniqueEntityId
  raffleId: UniqueEntityId
  hasWon?: boolean | null
  createdAt: Date
}

export class CustomerRaffle extends Entity<CustomerRaffleProps> {
  static create(
    props: Optional<CustomerRaffleProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const customerRaffle = new CustomerRaffle(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return customerRaffle
  }

  get customerId() {
    return this.props.customerId
  }

  get raffleId() {
    return this.props.raffleId
  }

  get hasWon() {
    return this.props.hasWon
  }

  get createdAt() {
    return this.props.createdAt
  }
}
