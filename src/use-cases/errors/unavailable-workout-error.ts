export class UnavailableWorkoutError extends Error {
  constructor() {
    super('This workout is currently unavailable.')
  }
}
