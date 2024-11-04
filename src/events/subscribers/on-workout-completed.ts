import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { ProvideActivityUseCase } from '@/use-cases/provide-activity'

import { WorkoutCompletedEvent } from '../publishers/workout-completed-event'

export class OnWorkoutCompleted implements EventHandler {
  constructor(private provideActivity: ProvideActivityUseCase) {
    this.setupSubscriptions()
  }

  // Using bind to keep the context of the class
  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewCompletedWorkoutNotification.bind(this),
      WorkoutCompletedEvent.name,
    )
  }

  private async sendNewCompletedWorkoutNotification({
    finishedWorkout,
  }: WorkoutCompletedEvent) {
    await this.provideActivity.execute({
      customerId: finishedWorkout.userId.toString(),
      activityType: 'STREAK',
    })
  }
}
