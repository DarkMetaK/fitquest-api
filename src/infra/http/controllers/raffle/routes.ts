import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { fetchAvailableRafflesController } from './fetch-available-raffles.controller'
import { fetchCurrentCustomerRafflesController } from './fetch-current-customer-raffles.controller'
import { purchaseRaffleTicketsController } from './purchase-raffle-tickets.controller'

export function raffleRoutes(app: FastifyInstance) {
  app.register(auth).get('/raffles/active', fetchAvailableRafflesController)
  app
    .register(auth)
    .get('/raffles/customer', fetchCurrentCustomerRafflesController)

  app
    .register(auth)
    .post('/raffles/:id/purchase', purchaseRaffleTicketsController)
}
