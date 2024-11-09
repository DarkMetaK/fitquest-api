export class ExpireRaffleError extends Error {
  constructor() {
    super('This raffle has already expired.')
  }
}
