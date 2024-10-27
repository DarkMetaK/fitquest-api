import { VerifyPhoneAvailabilityUseCase } from '@/use-cases/verify-phone-availability'

import { PrismaCustomersMetadataRepository } from '../repositories/prisma-customers-metadata-repository'

export class makeVerifyPhoneAvailabilityUseCase {
  static create(): VerifyPhoneAvailabilityUseCase {
    const customersMetadataRepository = new PrismaCustomersMetadataRepository()

    const verifyPhoneAvailaibilityUseCase = new VerifyPhoneAvailabilityUseCase(
      customersMetadataRepository,
    )

    return verifyPhoneAvailaibilityUseCase
  }
}
