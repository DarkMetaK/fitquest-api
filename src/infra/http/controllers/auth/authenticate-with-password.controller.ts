import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { LoginMethodError } from '@/core/errors/login-method-error'
import { makeAuthenticateWithPasswordUseCase } from '@/infra/database/prisma/factories/make-authenticate-with-password-use-case'

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

  try {
    const useCase = makeAuthenticateWithPasswordUseCase.create()

    const { accessToken, hasFinishedRegistration } = await useCase.execute({
      email,
      password,
    })

    return reply.status(200).send({
      access_token: accessToken,
      hasFinishedRegistration,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    if (error instanceof LoginMethodError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
