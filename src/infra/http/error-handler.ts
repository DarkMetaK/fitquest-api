import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { CustomerAlreadyHasMetadataError } from '@/core/errors/customer-already-has-metadata-error'
import { EmailAlreadyTakenError } from '@/core/errors/email-already-taken-error'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { LoginMethodError } from '@/core/errors/login-method-error'
import { PhoneAlreadyTakenError } from '@/core/errors/phone-already-taken-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof LoginMethodError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof EmailAlreadyTakenError) {
    return reply.status(409).send({ message: error.message })
  }

  if (error instanceof PhoneAlreadyTakenError) {
    return reply.status(409).send({ message: error.message })
  }

  if (error instanceof CustomerAlreadyHasMetadataError) {
    return reply.status(400).send({ message: error.message })
  }

  console.log(error)
  // TODO: Send error to observability platform

  return reply.status(500).send({ message: 'Internal server error.' })
}
