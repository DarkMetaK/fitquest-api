import { FastifyInstance } from 'fastify'

import { authenticateWithPasswordController } from './authenticate-with-password.controller'
import { createCustomerController } from './create-customer.controller'
import { registerCustomerMetadataController } from './register-customer-metadata.controller'

export function authRoutes(app: FastifyInstance) {
  // Auth not required
  app.post('/customers', createCustomerController)
  app.post('/sessions/password', authenticateWithPasswordController)

  // Auth required
  app.post('/customers/metadata', registerCustomerMetadataController)
}
