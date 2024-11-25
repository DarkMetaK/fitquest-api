import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchBundlesUseCase } from '@/infra/database/prisma/factories/use-cases/make-fetch-bundles-use-case'

import { BundlePresenter } from '../../presenters/bundle-presenter'

export async function fetchBundlesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.getCurrentUserId()

  const useCase = makeFetchBundlesUseCase.create()

  const { bundles } = await useCase.execute()

  return reply.status(200).send({
    bundles: bundles.map(BundlePresenter.toHTTP),
  })
}
