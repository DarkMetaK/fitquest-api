import dayjs from 'dayjs'
import cron from 'node-cron'

import { makeProvideActivityUseCase } from '../database/prisma/factories/make-provide-activity-use-case'
import { prisma } from '../libs/prisma'

export const registerInactiveCustomerActivityCron = cron.schedule(
  '0 0 * * *',
  async () => {
    const provideActivityUseCase = makeProvideActivityUseCase.create()
    const yesterday = dayjs().subtract(1, 'day').startOf('day').toDate()

    const customersIds = await prisma.user.findMany({
      where: {
        activities: {
          none: {
            date: {
              equals: yesterday,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    for (const customer of customersIds) {
      await provideActivityUseCase.execute({
        customerId: customer.id,
        activityType: 'INACTIVE',
        date: yesterday,
      })
    }
  },
  {
    scheduled: false,
    timezone: 'America/Sao_Paulo',
  },
)
