import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetWorkoutUseCase } from '@/infra/database/prisma/factories/use-cases/make-get-workout-use-case'

import { WorkoutDetailsPresenter } from '../../presenters/workout-details-presenter'

const getWorkoutParamSchema = z.object({
  id: z.string({ message: 'Id is required.' }).uuid(),
})

export async function getWorkoutController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.getCurrentUserId()

  const { id } = getWorkoutParamSchema.parse(request.params)

  const useCase = makeGetWorkoutUseCase.create()

  const { workout } = await useCase.execute({ id })

  return reply.status(200).send({
    workout: WorkoutDetailsPresenter.toHTTP(workout),
  })
}
