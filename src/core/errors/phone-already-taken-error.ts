export class PhoneAlreadyTakenError extends Error {
  constructor() {
    super('This phone is already taken.')
  }
}
