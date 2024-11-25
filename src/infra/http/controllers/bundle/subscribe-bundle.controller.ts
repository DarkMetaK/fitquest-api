import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSubscribeBundleUseCase } from '@/infra/database/prisma/factories/use-cases/make-subscribe-bundle-use-case'

const subscribeBundleParamSchema = z.object({
  bundleId: z.string({ message: 'Bundle id is required.' }).uuid(),
})

export async function SubscribeBundleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const { bundleId } = subscribeBundleParamSchema.parse(request.params)

  const useCase = makeSubscribeBundleUseCase.create()

  await useCase.execute({ customerId: userId, bundleId })

  return reply.status(200).send()
}
