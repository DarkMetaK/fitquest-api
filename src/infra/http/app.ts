import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '../env'
import { authRoutes } from './controllers/auth/routes'

export const app = fastify()

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: We should log to an external tool like DataDog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.register(authRoutes)
