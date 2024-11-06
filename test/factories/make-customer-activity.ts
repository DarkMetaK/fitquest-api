import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CustomerActivity,
  CustomerActivityProps,
} from '@/entities/customer-activity'
import { PrismaCustomerActivityMapper } from '@/infra/database/prisma/mappers/prisma-customer-activity-mapper'
import { prisma } from '@/infra/libs/prisma'

export function makeCustomerActivity(
  override: Partial<CustomerActivityProps> = {},
  id?: UniqueEntityId,
) {
  const activity = CustomerActivity.create(
    {
      customerId: new UniqueEntityId(faker.string.uuid()),
      activityType: faker.helpers.arrayElement(['STREAK', 'REST', 'INACTIVE']),
      date: new Date(),
      ...override,
    },
    id,
  )

  return activity
}

export async function makePrismaCustomerActivity(
  data: Partial<CustomerActivityProps> = {},
  id?: UniqueEntityId,
) {
  const activity = makeCustomerActivity(data, id)

  const prismaActivity = await prisma.userActivity.create({
    data: PrismaCustomerActivityMapper.toPrisma(activity),
  })

  return prismaActivity
}
