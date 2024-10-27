export class CustomerAlreadyHasMetadataError extends Error {
  constructor() {
    super('Customer already has metadata, please use update method instead.')
  }
}
