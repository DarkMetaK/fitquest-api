import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetRaffleUseCase } from '@/infra/database/prisma/factories/use-cases/make-get-raffle-use-case'

import { RafflePresenter } from '../../presenters/raffle-presenter'

const getRaffleParamSchema = z.object({
  id: z.string({ message: 'Id is required.' }).uuid(),
})

export async function getRaffleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.getCurrentUserId()

  const { id: raffleId } = getRaffleParamSchema.parse(request.params)

  const useCase = makeGetRaffleUseCase.create()

  const { raffle } = await useCase.execute({ raffleId })

  return reply.status(200).send({
    raffle: RafflePresenter.toHTTP(raffle),
  })
}
