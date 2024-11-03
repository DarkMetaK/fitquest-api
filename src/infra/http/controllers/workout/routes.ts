import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { completeWorkoutController } from './complete-workout.controller'
import { getActiveChallengesController } from './get-active-challenges.controller'
import { getWorkoutController } from './get-workout.controller'

export function workoutRoutes(app: FastifyInstance) {
  app.register(auth).get('/challenges', getActiveChallengesController)
  app.register(auth).get('/workouts/:id', getWorkoutController)

  app.register(auth).post('/workouts/:id/complete', completeWorkoutController)
}
