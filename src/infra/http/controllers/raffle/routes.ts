import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { fetchAvailableRafflesController } from './fetch-available-raffles.controller'
import { fetchCurrentCustomerRafflesController } from './fetch-current-customer-raffles.controller'
import { getCustomerRaffleTicketController } from './get-customer-raffle-ticket.controller'
import { getRaffleController } from './get-raffle.controller'
import { purchaseRaffleTicketsController } from './purchase-raffle-tickets.controller'

export function raffleRoutes(app: FastifyInstance) {
  app.register(auth).get('/raffles/:id', getRaffleController)
  app.register(auth).get('/raffles/active', fetchAvailableRafflesController)
  app
    .register(auth)
    .get('/raffles/customer', fetchCurrentCustomerRafflesController)
  app
    .register(auth)
    .get('/raffles/tickets/:ticketId', getCustomerRaffleTicketController)

  app
    .register(auth)
    .post('/raffles/:id/purchase', purchaseRaffleTicketsController)
}
