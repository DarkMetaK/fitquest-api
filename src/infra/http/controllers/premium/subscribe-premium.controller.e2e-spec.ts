import request from 'supertest'
import { makePrismaCustomer } from 'test/factories/make-customer'
import { makePrismaCustomerMetadata } from 'test/factories/make-customer-metadata'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/gateways/cryptography/jwt-encrypter'
import { prisma } from '@/infra/libs/prisma'

let jwt: JwtEncrypter

describe('Subscribe Premium (E2E)', () => {
  beforeAll(async () => {
    jwt = new JwtEncrypter()

    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
    vi.useRealTimers()
  })

  test('[POST] /premium/subscribe', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 0, 0, 0))

    const user = await makePrismaCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    const accessToken = await jwt.encrypt({
      sub: user.id.toString(),
    })

    await makePrismaCustomerMetadata({
      customerId: new UniqueEntityId(user.id),
      premiumExpiresAt: null,
    })

    const response = await request(app.server)
      .post('/premium/subscribe')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    const userOnDatabase = await prisma.customerMetadata.findUnique({
      where: {
        userId: user.id,
      },
    })

    expect(userOnDatabase?.premiumExpiresAt).toEqual(
      new Date(2025, 0, 1, 0, 0, 0),
    )
  })
})
