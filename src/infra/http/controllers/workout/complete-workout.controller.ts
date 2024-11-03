import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCompleteWorkoutUseCase } from '@/infra/database/prisma/factories/make-complete-workout-use-case'

const completeWorkoutParamSchema = z.object({
  id: z.string({ message: 'Id is required.' }).uuid(),
})

export async function completeWorkoutController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const { id } = completeWorkoutParamSchema.parse(request.params)

  const useCase = makeCompleteWorkoutUseCase.create()

  await useCase.execute({
    customerId: userId,
    workoutId: id,
  })

  return reply.status(200).send()
}
