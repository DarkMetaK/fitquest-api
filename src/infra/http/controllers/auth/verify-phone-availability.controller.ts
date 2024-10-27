import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PhoneAlreadyTakenError } from '@/core/errors/phone-already-taken-error'
import { makeVerifyPhoneAvailabilityUseCase } from '@/infra/database/prisma/factories/make-verify-phone-availability-use-case'

const authenticateWithPasswordBodySchema = z.object({
  phone: z
    .string({ message: 'Phone is required.' })
    .regex(/\d{2} \d{4,5}-\d{4}$/, { message: 'Invalid phone.' }),
})

export async function verifyPhoneAvailabilityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { phone } = authenticateWithPasswordBodySchema.parse(request.body)

  try {
    const useCase = makeVerifyPhoneAvailabilityUseCase.create()

    await useCase.execute({
      phone,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof PhoneAlreadyTakenError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
