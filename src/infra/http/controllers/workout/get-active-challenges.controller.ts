import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchActiveChallengesUseCase } from '@/infra/database/prisma/factories/make-fetch-active-challenges-use-case'

import { WorkoutPresenter } from '../../presenters/workout-presenter'

export async function getActiveChallengesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const useCase = makeFetchActiveChallengesUseCase.create()

  const { activechallenges } = await useCase.execute()

  return reply.status(200).send({
    challenges: activechallenges.map(WorkoutPresenter.toHTTP),
  })
}
