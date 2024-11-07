import { CustomerDetails } from '@/entities/value-objects/customer-details'

export class CustomerDetailsPresenter {
  static toHTTP(customer: CustomerDetails) {
    return {
      id: customer.customerId.toString(),
      phone: customer.phone,
      age: customer.age,
      weight: customer.weight,
      height: customer.height,
      goal: customer.goal,
      weeklyStreakGoal: customer.weeklyStreakGoal,
      experienceAmount: customer.experienceAmount,
      currencyAmount: customer.currencyAmount,
      totalWorkouts: customer.totalWorkouts,
      totalExercises: customer.totalExercises,
      totalCalories: customer.totalCalories,
      highestStreak: customer.highestStreak,
      premiumExpiresAt: customer.premiumExpiresAt,
    }
  }
}
