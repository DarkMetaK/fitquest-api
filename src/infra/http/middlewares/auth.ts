import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { prisma } from '@/infra/libs/prisma'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.getCurrentUserId = async () => {
      try {
        await request.jwtVerify()

        // Temporary solution to check if user exists
        const userExists = await prisma.user.findUnique({
          where: {
            id: request.user.sub,
          },
        })

        if (!userExists) {
          throw new Error()
        }

        return request.user.sub
      } catch {
        return reply
          .status(401)
          .send({ message: 'Invalid or expired token provided.' })
      }
    }
  })
})
