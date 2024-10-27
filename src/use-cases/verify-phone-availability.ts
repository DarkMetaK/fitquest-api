import { CustomersMetadataRepository } from '@/adapters/repositories/customers-metadata-repository'
import { PhoneAlreadyTakenError } from '@/core/errors/phone-already-taken-error'

interface VerifyPhoneAvailabilityUseCaseRequest {
  phone: string
}

export class VerifyPhoneAvailabilityUseCase {
  constructor(
    private customersMetadataRepository: CustomersMetadataRepository,
  ) {}

  async execute({
    phone,
  }: VerifyPhoneAvailabilityUseCaseRequest): Promise<void> {
    const phoneAlreadyInUse =
      await this.customersMetadataRepository.findByPhone(phone)

    if (phoneAlreadyInUse) {
      throw new PhoneAlreadyTakenError()
    }

    // TODO: Send confirmation token
  }
}
