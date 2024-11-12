import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RaffleProps {
  name: string
  description: string
  bannerUrl: string
  price: number
  isPremium: boolean
  freeTierQuota: number
  expiresAt: Date
  createdAt: Date
}

export class Raffle extends Entity<RaffleProps> {
  static create(
    props: Optional<RaffleProps, 'createdAt' | 'freeTierQuota'>,
    id?: UniqueEntityId,
  ) {
    const raffle = new Raffle(
      {
        ...props,
        freeTierQuota: props.freeTierQuota ?? 5,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return raffle
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
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

  get freeTierQuota() {
    return this.props.freeTierQuota
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  isExpired() {
    return this.expiresAt < new Date()
  }
}
