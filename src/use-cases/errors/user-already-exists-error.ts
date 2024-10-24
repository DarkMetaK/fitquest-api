export class UserAlreadyExistsError extends Error {
  constructor(type: 'email' | 'phone' = 'email') {
    super(`User with this ${type} already exists.`)
  }
}
