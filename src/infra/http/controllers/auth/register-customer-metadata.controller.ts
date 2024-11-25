import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateCustomerMetadataUseCase } from '@/infra/database/prisma/factories/use-cases/make-create-customer-metadata-use-case'

const registerCustomerMetadataBodySchema = z.object({
  phone: z
    .string({ message: 'Phone is required.' })
    .regex(/\d{2} \d{4,5}-\d{4}$/, { message: 'Invalid phone.' }),
  age: z.number({ message: 'Age is required.' }),
  weight: z.number({ message: 'Weight is required.' }),
  height: z.number({ message: 'Height is required.' }),
  goal: z.enum(
    [
      'LOSE_WEIGHT',
      'GAIN_MUSCLE_MASS',
      'ENHANCE_HEALTH',
      'INCREASE_FLEXIBILITY',
    ],
    { message: 'Invalid goal.' },
  ),
  weeklyStreakGoal: z
    .number({ message: 'Weekly streak goal is required.' })
    .min(1, { message: 'Weekly streak goal must be greater than 0.' })
    .max(7, { message: 'Weekly streak goal must be less than 8.' }),
})

export async function registerCustomerMetadataController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const { age, goal, height, phone, weight, weeklyStreakGoal } =
    registerCustomerMetadataBodySchema.parse(request.body)

  const useCase = makeCreateCustomerMetadataUseCase.create()

  await useCase.execute({
    customerId: userId,
    phone,
    age,
    height,
    weight,
    goal,
    weeklyStreakGoal,
  })

  return reply.status(201).send()
}
