import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchCustomerRafflesTicketsUseCase } from '@/infra/database/prisma/factories/make-fetch-customer-raffles-tickets-use-case'

import { CustomerRaffleTicketPresenter } from '../../presenters/customer-raffle-ticket-presenter'

export async function fetchCurrentCustomerRafflesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerId = await request.getCurrentUserId()

  const useCase = makeFetchCustomerRafflesTicketsUseCase.create()

  const { tickets } = await useCase.execute({
    customerId,
  })

  return reply.status(200).send({
    tickets: tickets.map(CustomerRaffleTicketPresenter.toHTTP),
  })
}
