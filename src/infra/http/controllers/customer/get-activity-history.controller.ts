import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetCustomerActivityHistory } from '@/infra/database/prisma/factories/make-get-customer-activity-history-use-case'

import { ActivityPresenter } from '../../presenters/activity-presenter'

const getActivityHistoryParamSchema = z.object({
  from: z.date().optional(),
  until: z.date().optional(),
})

export async function getActivityHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = await request.getCurrentUserId()

  const { from, until } = getActivityHistoryParamSchema.parse(request.params)

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
