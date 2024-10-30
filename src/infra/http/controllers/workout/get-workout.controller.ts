import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetWorkoutUseCase } from '@/infra/database/prisma/factories/make-get-workout-use-case'

import { WorkoutDetailsPresenter } from '../../presenters/workout-details-presenter'

const getWorkoutParamSchema = z.object({
  id: z.string({ message: 'Id is required.' }).uuid(),
})

export async function getWorkoutController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const { id } = getWorkoutParamSchema.parse(request.params)

  try {
    const useCase = makeGetWorkoutUseCase.create()

    const { workout } = await useCase.execute({ id })

    return reply.status(200).send({
      workout: WorkoutDetailsPresenter.toHTTP(workout),
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
