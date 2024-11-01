export class ActiveSubscriptionError extends Error {
  constructor() {
    super('Customer already has an active subscription.')
  }
}
