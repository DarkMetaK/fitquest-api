export class PremiumActionError extends Error {
  constructor() {
    super('This action is only available for premium users.')
  }
}
