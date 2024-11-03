import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { fetchBundlesController } from './fetch-bundles.controller'
import { GetCustomerActiveBundleController } from './get-customer-active-bundle.controller'
import { SubscribeBundleController } from './subscribe-bundle.controller'

export function bundleRoutes(app: FastifyInstance) {
  app.register(auth).get('/bundles', fetchBundlesController)
  app
    .register(auth)
    .get('/bundles/in-progress', GetCustomerActiveBundleController)

  app
    .register(auth)
    .post('/bundles/:bundleId/subscribe', SubscribeBundleController)
}
