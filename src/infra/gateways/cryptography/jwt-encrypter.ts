import { Encrypter } from '@/adapters/gateways/cryptography/encrypter'
import { app } from '@/infra/app'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return app.jwt.sign(payload)
  }
}
