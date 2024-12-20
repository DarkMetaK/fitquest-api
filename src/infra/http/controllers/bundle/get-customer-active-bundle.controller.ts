import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetCustomerActiveBundleUseCase } from '@/infra/database/prisma/factories/use-cases/make-get-customer-active-bundle-use-case'

import { CustomerBundlePresenter } from '../../presenters/customer-bundle-presenter'

export async function GetCustomerActiveBundleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const useCase = makeGetCustomerActiveBundleUseCase.create()

  const { activeBundle } = await useCase.execute({ customerId: userId })

  return reply.status(200).send({
    activeBundle: activeBundle
      ? CustomerBundlePresenter.toHTTP(activeBundle)
      : null,
  })
}
