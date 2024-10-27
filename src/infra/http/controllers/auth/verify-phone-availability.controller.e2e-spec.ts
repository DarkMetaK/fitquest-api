import request from 'supertest'

import { app } from '../../app'

describe('Verify phone availability (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /phone/status', async () => {
    const response = await request(app.server).post('/phone/status').send({
      phone: '11 99999-9999',
    })

    expect(response.statusCode).toEqual(200)
  })
})
