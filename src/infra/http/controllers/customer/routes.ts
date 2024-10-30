import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { getCurrentCustomerController } from './get-current-customer.controller'

export function customerRoutes(app: FastifyInstance) {
  app.register(auth).get('/me', getCurrentCustomerController)
}
