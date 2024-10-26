import { FastifyInstance } from 'fastify'

import { createCustomerController } from './create-customer.controller'

export function authRoutes(app: FastifyInstance) {
  app.post('/customers', createCustomerController)
}
