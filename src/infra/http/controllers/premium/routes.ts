import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { subscribePremiumController } from './subscribe-premium.controller'

export function premiumRoutes(app: FastifyInstance) {
  app.register(auth).post('/premium/subscribe', subscribePremiumController)
}
