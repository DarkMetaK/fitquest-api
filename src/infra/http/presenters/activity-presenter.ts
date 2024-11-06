import { CustomerActivity } from '@/entities/customer-activity'

export class ActivityPresenter {
  static toHTTP(activity: CustomerActivity) {
    return {
      date: activity.date,
      activityType: activity.activityType,
    }
  }
}
