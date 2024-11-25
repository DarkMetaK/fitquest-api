import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchActiveChallengesUseCase } from '@/infra/database/prisma/factories/use-cases/make-fetch-active-challenges-use-case'

import { WorkoutPresenter } from '../../presenters/workout-presenter'

export async function fetchActiveChallengesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.getCurrentUserId()

  const useCase = makeFetchActiveChallengesUseCase.create()

  const { activechallenges } = await useCase.execute()

  return reply.status(200).send({
    challenges: activechallenges.map(WorkoutPresenter.toHTTP),
  })
}
