export class CustomerNotSubscribedToBundleError extends Error {
  constructor() {
    super('Customer is not subscribed to the bundle.')
  }
}
