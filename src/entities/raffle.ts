import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RaffleProps {
  name: string
  bannerUrl: string
  price: number
  isPremium: boolean
  expiresAt: Date
  createdAt: Date
}

export class Raffle extends Entity<RaffleProps> {
  static create(
    props: Optional<RaffleProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const raffle = new Raffle(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return raffle
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
