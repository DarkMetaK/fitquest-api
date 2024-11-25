import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetCustomerUseCase } from '@/infra/database/prisma/factories/use-cases/make-get-customer-use-case'

import { CustomerPresenter } from '../../presenters/customer-presenter'

export async function getCurrentCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const useCase = makeGetCustomerUseCase.create()

  const { customer } = await useCase.execute({
    customerId: userId,
  })

  return reply.status(200).send({
    customer: CustomerPresenter.toHTTP(customer),
  })
}
