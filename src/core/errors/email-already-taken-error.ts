export class EmailAlreadyTakenError extends Error {
  constructor() {
    super(`This email is already taken.`)
  }
}
