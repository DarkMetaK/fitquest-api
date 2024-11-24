import { SubscribePremiumUseCase } from '@/use-cases/subscribe-premium'

import { PrismaCustomersRepository } from '../repositories/prisma-customers-repository'

export class makeSubscribePremiumUseCase {
  static create(): SubscribePremiumUseCase {
    const customersRepository = new PrismaCustomersRepository()

    const subscribePremiumUseCase = new SubscribePremiumUseCase(
      customersRepository,
    )

    return subscribePremiumUseCase
  }
}
