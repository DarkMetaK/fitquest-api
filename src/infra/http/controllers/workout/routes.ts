import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { getActiveChallengesController } from './get-active-challenges.controller'
import { getWorkoutController } from './get-workout.controller'

export function workoutRoutes(app: FastifyInstance) {
  app.register(auth).get('/challenges', getActiveChallengesController)
  app.register(auth).get('/workouts/:id', getWorkoutController)
}
