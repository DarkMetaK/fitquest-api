export class LoginMethodError extends Error {
  constructor(message?: string) {
    super(message ?? 'This login method is invalid.')
  }
}
