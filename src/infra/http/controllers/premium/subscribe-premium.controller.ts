import { FastifyReply, FastifyRequest } from 'fastify'

import { makeSubscribePremiumUseCase } from '@/infra/database/prisma/factories/make-subscribe-premium-use-case'

export async function subscribePremiumController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerId = await request.getCurrentUserId()

  const useCase = makeSubscribePremiumUseCase.create()

  await useCase.execute({
    customerId,
    months: 12,
  })

  return reply.status(200).send()
}
