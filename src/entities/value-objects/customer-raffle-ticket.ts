import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ValueObject } from '../../core/entities/value-object'

export interface CustomerRaffleTicketProps {
  ticketId: UniqueEntityId
  customerId: UniqueEntityId
  raffleId: UniqueEntityId
  hasWon?: boolean | null
  name: string
  bannerUrl: string
  price: number
  isPremium: boolean
  expiresAt: Date
  createdAt: Date
}

export class CustomerRaffleTicket extends ValueObject<CustomerRaffleTicketProps> {
  static create(props: CustomerRaffleTicketProps) {
    return new CustomerRaffleTicket(props)
  }

  get ticketId() {
    return this.props.ticketId
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

  get name() {
    return this.props.name
  }

  get bannerUrl() {
    return this.props.bannerUrl
  }

  get price() {
    return this.props.price
  }

  get isPremium() {
    return this.props.isPremium
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get createdAt() {
    return this.props.createdAt
  }
}
