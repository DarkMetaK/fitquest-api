export class ExpiredRaffleError extends Error {
  constructor() {
    super('This raffle has already expired.')
  }
}
