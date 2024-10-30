import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.getCurrentUserId = async () => {
      try {
        await request.jwtVerify()

        return request.user.sub
      } catch {
        return reply
          .status(401)
          .send({ message: 'Invalid or expired token provided.' })
      }
    }
  })
})
