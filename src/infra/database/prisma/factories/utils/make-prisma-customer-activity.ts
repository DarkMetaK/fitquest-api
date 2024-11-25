import { makeCustomerActivity } from 'test/factories/make-customer-activity'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CustomerActivityProps } from '@/entities/customer-activity'
import { PrismaCustomerActivityMapper } from '@/infra/database/prisma/mappers/prisma-customer-activity-mapper'
import { prisma } from '@/infra/libs/prisma'

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
