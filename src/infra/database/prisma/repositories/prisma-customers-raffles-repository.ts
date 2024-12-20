import { CustomersRafflesRepository } from '@/adapters/repositories/customers-raffles-repository'
import { CustomerRaffle } from '@/entities/customer-raffle'
import { CustomerRaffleTicket } from '@/entities/value-objects/customer-raffle-ticket'
import { prisma } from '@/infra/libs/prisma'

import { PrismaCustomerRaffleMapper } from '../mappers/prisma-customer-raffle-mapper'
import { PrismaCustomerRaffleTicketMapper } from '../mappers/prisma-customer-raffle-ticket-mapper'

export class PrismaCustomersRafflesRepository
  implements CustomersRafflesRepository
{
  async findById(id: string): Promise<CustomerRaffle | null> {
    const ticket = await prisma.customerRaffle.findUnique({
      where: {
        id,
      },
    })

    if (!ticket) {
      return null
    }

    return PrismaCustomerRaffleMapper.toDomain(ticket)
  }

  async findByIdWithDetails(id: string): Promise<CustomerRaffleTicket | null> {
    const ticket = await prisma.customerRaffle.findUnique({
      where: {
        id,
      },
      include: {
        raffle: true,
      },
    })

    if (!ticket) {
      return null
    }

    return PrismaCustomerRaffleTicketMapper.toDomain(ticket)
  }

  async findManyByCustomerId(customerId: string): Promise<CustomerRaffle[]> {
    const tickets = await prisma.customerRaffle.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return tickets.map(PrismaCustomerRaffleMapper.toDomain)
  }

  async findManyByCustomerIdWithDetails(
    customerId: string,
    raffleId?: string,
  ): Promise<CustomerRaffleTicket[]> {
    const tickets = await prisma.customerRaffle.findMany({
      where: {
        customerId,
        raffleId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        raffle: true,
      },
    })

    return tickets.map(PrismaCustomerRaffleTicketMapper.toDomain)
  }

  async findManyByCustomerIdAndRaffleId(
    customerId: string,
    raffleId: string,
  ): Promise<CustomerRaffle[]> {
    const tickets = await prisma.customerRaffle.findMany({
      where: {
        customerId,
        raffleId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return tickets.map(PrismaCustomerRaffleMapper.toDomain)
  }

  async create(customerRaffle: CustomerRaffle): Promise<void> {
    const data = PrismaCustomerRaffleMapper.toPrisma(customerRaffle)

    await prisma.customerRaffle.create({
      data,
    })
  }

  async createMany(
    customerRaffles: CustomerRaffle[],
  ): Promise<CustomerRaffleTicket[]> {
    const data = customerRaffles.map(PrismaCustomerRaffleMapper.toPrisma)

    const tickets = await prisma.$transaction(
      data.map((item) =>
        prisma.customerRaffle.create({
          data: item,
          include: {
            raffle: true,
          },
        }),
      ),
    )

    return tickets.map(PrismaCustomerRaffleTicketMapper.toDomain)
  }
}
