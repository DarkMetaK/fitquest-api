import { resolve } from 'node:path'

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'

import { env } from '../env'
import { authRoutes } from './controllers/auth/routes'
import { customerRoutes } from './controllers/customer/routes'
import { workoutRoutes } from './controllers/workout/routes'
import { errorHandler } from './error-handler'

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

app.setErrorHandler(errorHandler)

app.register(authRoutes)
app.register(customerRoutes)
app.register(workoutRoutes)
