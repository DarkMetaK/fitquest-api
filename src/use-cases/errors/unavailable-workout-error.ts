export class UnavailableWorkoutError extends Error {
  constructor(message?: string) {
    super(message ?? 'This workout is currently unavailable.')
  }
}
