export class PremiumRequiredError extends Error {
  constructor() {
    super('Premium membership is required to access this feature.')
  }
}
