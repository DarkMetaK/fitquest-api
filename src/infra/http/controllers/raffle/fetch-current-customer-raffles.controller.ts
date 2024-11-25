import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchCustomerRafflesTicketsUseCase } from '@/infra/database/prisma/factories/use-cases/make-fetch-customer-raffles-tickets-use-case'

import { CustomerRaffleTicketPresenter } from '../../presenters/customer-raffle-ticket-presenter'

const fetchCurrentCustomerRafflesQuerySchema = z.object({
  raffleId: z.string().uuid().optional(),
})

export async function fetchCurrentCustomerRafflesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerId = await request.getCurrentUserId()

  const { raffleId } = fetchCurrentCustomerRafflesQuerySchema.parse(
    request.query,
  )

  const useCase = makeFetchCustomerRafflesTicketsUseCase.create()

  const { tickets } = await useCase.execute({
    customerId,
    raffleId,
  })

  return reply.status(200).send({
    tickets: tickets.map(CustomerRaffleTicketPresenter.toHTTP),
  })
}
