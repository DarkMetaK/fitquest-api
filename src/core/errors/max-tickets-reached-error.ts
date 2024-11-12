export class MaxTicketsReachedError extends Error {
  constructor() {
    super('You have reached the maximum amount of tickets for this raffle.')
  }
}
