import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { getActivityHistoryController } from './get-activity-history.controller'
import { getCurrentCustomerController } from './get-current-customer.controller'
import { getCustomerDetailsController } from './get-customer-details.controller'

export function customerRoutes(app: FastifyInstance) {
  app.register(auth).get('/me', getCurrentCustomerController)
  app.register(auth).get('/activities', getActivityHistoryController)
  app.register(auth).get('/me/metadata', getCustomerDetailsController)
}
