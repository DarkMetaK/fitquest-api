import cron from 'node-cron'

import { makeProvideActivityUseCase } from '../database/prisma/factories/make-provide-activity-use-case'
import { prisma } from '../libs/prisma'

export const registerInactiveCustomerActivityCron = cron.schedule(
  '0 0 * * *',
  async () => {
    const provideActivityUseCase = makeProvideActivityUseCase.create()

    const customersIds = await prisma.user.findMany({
      where: {
        activities: {
          none: {
            date: {
              gte: new Date(),
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    for (const customer of customersIds) {
      console.log(customer)
      await provideActivityUseCase.execute({
        customerId: customer.id,
        activityType: 'INACTIVE',
      })
    }

    console.log(await prisma.userActivity.findMany())
  },
  {
    scheduled: false,
    timezone: 'America/Sao_Paulo',
  },
)
