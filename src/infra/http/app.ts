import { resolve } from 'node:path'

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '../env'
import { authRoutes } from './controllers/auth/routes'
import { customerRoutes } from './controllers/customer/routes'
import { workoutRoutes } from './controllers/workout/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifyStatic, {
  root: resolve(__dirname, '../../../uploads'),
  prefix: '/uploads/',
})

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
app.register(customerRoutes)
app.register(workoutRoutes)
