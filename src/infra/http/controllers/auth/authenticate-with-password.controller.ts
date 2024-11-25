import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateWithPasswordUseCase } from '@/infra/database/prisma/factories/use-cases/make-authenticate-with-password-use-case'

const authenticateWithPasswordBodySchema = z.object({
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email.' }),
  password: z.string({ message: 'Password is required.' }),
})

export async function authenticateWithPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateWithPasswordBodySchema.parse(
    request.body,
  )

  const useCase = makeAuthenticateWithPasswordUseCase.create()

  const { accessToken, hasFinishedRegistration } = await useCase.execute({
    email,
    password,
  })

  return reply.status(200).send({
    access_token: accessToken,
    hasFinishedRegistration,
  })
}
