import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePurchaseRaffleTicketsUseCase } from '@/infra/database/prisma/factories/make-purchase-raffle-tickets-use-case'

const purchaseRaffleTicketsParamSchema = z.object({
  id: z.string({ message: 'Id is required.' }).uuid(),
})

const purchaseRaffleTicketsQuerySchema = z.object({
  amount: z.coerce.number().optional(),
})

export async function purchaseRaffleTicketsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const customerId = await request.getCurrentUserId()

  const { id: raffleId } = purchaseRaffleTicketsParamSchema.parse(
    request.params,
  )

  const { amount } = purchaseRaffleTicketsQuerySchema.parse(request.query)

  const useCase = makePurchaseRaffleTicketsUseCase.create()

  await useCase.execute({
    customerId,
    raffleId,
    amount,
  })

  return reply.status(201).send()
}
