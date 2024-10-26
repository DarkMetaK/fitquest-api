import { FastifyInstance } from 'fastify'

import { authenticateWithPasswordController } from './authenticate-with-password.controller'
import { createCustomerController } from './create-customer.controller'

export function authRoutes(app: FastifyInstance) {
  app.post('/customers', createCustomerController)
  app.post('/sessions/password', authenticateWithPasswordController)
}
