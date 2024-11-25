import { resolve } from 'node:path'

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'

import { OnWorkoutCompleted } from '@/events/subscribers/on-workout-completed'

import { makeProvideActivityUseCase } from './database/prisma/factories/use-cases/make-provide-activity-use-case'
import { env } from './env'
import { errorHandler } from './error-handler'
import { authRoutes } from './http/controllers/auth/routes'
import { bundleRoutes } from './http/controllers/bundle/routes'
import { customerRoutes } from './http/controllers/customer/routes'
import { premiumRoutes } from './http/controllers/premium/routes'
import { raffleRoutes } from './http/controllers/raffle/routes'
import { workoutRoutes } from './http/controllers/workout/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifyStatic, {
  root: resolve(__dirname, '../../uploads'),
  prefix: '/uploads/',
})

app.setErrorHandler(errorHandler)

// Events
new OnWorkoutCompleted(makeProvideActivityUseCase.create())

// Routes
app.register(authRoutes)
app.register(customerRoutes)
app.register(workoutRoutes)
app.register(bundleRoutes)
app.register(raffleRoutes)
app.register(premiumRoutes)
