import { makeCustomerMetadata } from 'test/factories/make-customer-metadata'
import { InMemoryCustomersMetadataRepository } from 'test/in-memory/in-memory-customers-metadata-repository'

import { PhoneAlreadyTakenError } from '@/core/errors/phone-already-taken-error'

import { VerifyPhoneAvailabilityUseCase } from './verify-phone-availability'

let sut: VerifyPhoneAvailabilityUseCase
let customersMetadataRepository: InMemoryCustomersMetadataRepository

describe('Use Case: Verify Phone Availability', () => {
  beforeEach(async () => {
    customersMetadataRepository = new InMemoryCustomersMetadataRepository()
    sut = new VerifyPhoneAvailabilityUseCase(customersMetadataRepository)
  })

  it('should be able to validate available phone', async () => {
    await expect(sut.execute({ phone: '123456789' })).resolves.not.toThrow()
  })

  it('should throw error if phone is already taken', async () => {
    customersMetadataRepository.create(
      makeCustomerMetadata({
        phone: '123456789',
      }),
    )

    await expect(() =>
      sut.execute({ phone: '123456789' }),
    ).rejects.toBeInstanceOf(PhoneAlreadyTakenError)
  })
})
