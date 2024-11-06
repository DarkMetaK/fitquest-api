import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { getActivityHistoryController } from './get-activity-history.controller'
import { getCurrentCustomerController } from './get-current-customer.controller'

export function customerRoutes(app: FastifyInstance) {
  app.register(auth).get('/me', getCurrentCustomerController)
  app.get('/activities', getActivityHistoryController)
}
