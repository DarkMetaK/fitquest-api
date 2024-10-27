import { FastifyInstance } from 'fastify'

import { authenticateWithPasswordController } from './authenticate-with-password.controller'
import { createCustomerController } from './create-customer.controller'
import { registerCustomerMetadataController } from './register-customer-metadata.controller'
import { verifyPhoneAvailabilityController } from './verify-phone-availability.controller'

export function authRoutes(app: FastifyInstance) {
  // Auth not required
  app.post('/customers', createCustomerController)
  app.post('/sessions/password', authenticateWithPasswordController)
  app.post('/phone/status', verifyPhoneAvailabilityController)

  // Auth required
  app.post('/customers/metadata', registerCustomerMetadataController)
}
