import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetCustomerUseCase } from '@/infra/database/prisma/factories/make-get-customer-use-case'

import { CustomerPresenter } from '../../presenters/customer-presenter'

export async function getCurrentCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()
  const userId = request.user.sub

  try {
    const useCase = makeGetCustomerUseCase.create()

    const { customer } = await useCase.execute({
      customerId: userId,
    })

    return reply.status(200).send({
      customer: CustomerPresenter.toHTTP(customer),
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
