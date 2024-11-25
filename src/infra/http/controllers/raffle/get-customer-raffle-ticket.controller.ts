import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetCustomerRaffleTicketUseCase } from '@/infra/database/prisma/factories/use-cases/make-get-customer-raffle-ticket-use-case'

import { CustomerRaffleTicketPresenter } from '../../presenters/customer-raffle-ticket-presenter'

const getCustomerRaffleTicketParamSchema = z.object({
  ticketId: z.string().uuid(),
})

export async function getCustomerRaffleTicketController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerId = await request.getCurrentUserId()

  const { ticketId } = getCustomerRaffleTicketParamSchema.parse(request.params)

  const useCase = makeGetCustomerRaffleTicketUseCase.create()

  const { ticket } = await useCase.execute({
    customerId,
    ticketId,
  })

  return reply.status(200).send({
    ticket: CustomerRaffleTicketPresenter.toHTTP(ticket),
  })
}
