import { FastifyInstance } from 'fastify'

import { getActiveChallengesController } from './get-active-challenges.controller'
import { getWorkoutController } from './get-workout.controller'

export function workoutRoutes(app: FastifyInstance) {
  app.get('/challenges', getActiveChallengesController)
  app.get('/workouts/:id', getWorkoutController)
}
