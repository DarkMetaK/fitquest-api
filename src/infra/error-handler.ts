import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { ActiveSubscriptionError } from '@/core/errors/active-subscription-error'
import { CustomerAlreadyHasMetadataError } from '@/core/errors/customer-already-has-metadata-error'
import { CustomerNotSubscribedToBundleError } from '@/core/errors/customer-not-subscribed-to-bundle-error'
import { EmailAlreadyTakenError } from '@/core/errors/email-already-taken-error'
import { ExpiredRaffleError } from '@/core/errors/expired-raffle-error'
import { InsufficientBalanceError } from '@/core/errors/insufficient-balance-error'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { LoginMethodError } from '@/core/errors/login-method-error'
import { PhoneAlreadyTakenError } from '@/core/errors/phone-already-taken-error'
import { PremiumRequiredError } from '@/core/errors/premium-required-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/unauthorized-error'
import { UnavailableWorkoutError } from '@/core/errors/unavailable-workout-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: error.issues.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        }
      }),
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

  if (error instanceof ActiveSubscriptionError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof CustomerNotSubscribedToBundleError) {
    return reply.status(403).send({ message: error.message })
  }

  if (error instanceof UnavailableWorkoutError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof PremiumRequiredError) {
    return reply.status(402).send({ message: error.message })
  }

  if (error instanceof ExpiredRaffleError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof InsufficientBalanceError) {
    return reply.status(402).send({ message: error.message })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }

  console.log(error)
  // TODO: Send error to observability platform

  return reply.status(500).send({ message: 'Internal server error.' })
}
