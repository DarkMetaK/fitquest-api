import { FastifyInstance } from 'fastify'

import { getCurrentCustomerController } from './get-current-customer.controller'

export function customerRoutes(app: FastifyInstance) {
  app.get('/me', getCurrentCustomerController)
}
