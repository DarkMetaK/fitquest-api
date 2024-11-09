export class InsufficientBalanceError extends Error {
  constructor() {
    super('You do not have enough balance to complete this operation.')
  }
}
