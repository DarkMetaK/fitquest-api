import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetCustomerWithDetailsUseCase } from '@/infra/database/prisma/factories/make-get-customer-details-use-case'

import { CustomerDetailsPresenter } from '../../presenters/customer-details-presenter'

export async function getCustomerDetailsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const useCase = makeGetCustomerWithDetailsUseCase.create()

  const { customer } = await useCase.execute({
    customerId: userId,
  })

  return reply.status(200).send({
    customer: CustomerDetailsPresenter.toHTTP(customer),
  })
}
