import { FastifyInstance } from 'fastify'

import { getActiveChallengesController } from './get-active-challenges.controller'

export function workoutRoutes(app: FastifyInstance) {
  app.get('/challenges', getActiveChallengesController)
}
