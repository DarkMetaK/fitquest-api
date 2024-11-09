import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchAvailableRafflesUseCase } from '@/infra/database/prisma/factories/make-fetch-available-raffles-use-case'

import { RafflePresenter } from '../../presenters/raffle-presenter'

export async function fetchAvailableRafflesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.getCurrentUserId()

  const useCase = makeFetchAvailableRafflesUseCase.create()

  const { raffles } = await useCase.execute()

  return reply.status(200).send({
    raffles: raffles.map(RafflePresenter.toHTTP),
  })
}
