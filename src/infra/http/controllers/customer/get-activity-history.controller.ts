import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetCustomerActivityHistory } from '@/infra/database/prisma/factories/use-cases/make-get-customer-activity-history-use-case'

import { ActivityPresenter } from '../../presenters/activity-presenter'

const getActivityHistoryQuerySchema = z.object({
  from: z.string().optional(),
  until: z.string().optional(),
})

export async function getActivityHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const { from: fromString, until: untilString } =
    getActivityHistoryQuerySchema.parse(request.query)
  const from = fromString ? dayjs(fromString).toDate() : undefined
  const until = untilString ? dayjs(untilString).toDate() : undefined

  const useCase = makeGetCustomerActivityHistory.create()

  const { activities } = await useCase.execute({
    customerId: userId,
    from,
    until,
  })

  return reply.status(200).send({
    activities: {
      data: activities.map((activity) => ActivityPresenter.toHTTP(activity)),
      from: from
        ? dayjs(from).format('YYYY-MM-DD')
        : dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      until: until
        ? dayjs(until).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    },
  })
}
