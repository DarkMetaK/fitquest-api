import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAlreadyTakenError } from '@/core/errors/email-already-taken-error'
import { makeCreateCustomerUseCase } from '@/infra/database/prisma/factories/make-create-customer-use-case'

const createCustomerBodySchema = z.object({
  name: z.string({ message: 'Name is required.' }),
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email.' }),
  password: z
    .string({ message: 'Password is required.' })
    .min(6, { message: 'Password must have at least 6 characters.' }),
})

export async function createCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = createCustomerBodySchema.parse(request.body)

  try {
    const useCase = makeCreateCustomerUseCase.create()

    await useCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof EmailAlreadyTakenError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
