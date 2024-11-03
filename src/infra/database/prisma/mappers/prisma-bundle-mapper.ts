import { Bundle as PrismaBundle, Prisma } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Bundle } from '@/entities/bundle'

import {
  PrismaWorkoutMapper,
  PrismaWorkoutWithSteps,
} from './prisma-workout-mapper'

type PrismaBundleWithWorkouts = PrismaBundle & {
  workouts: PrismaWorkoutWithSteps[]
}

export class PrismaBundleMapper {
  static toDomain(raw: PrismaBundleWithWorkouts): Bundle {
    const bundle = Bundle.create(
      {
        name: raw.name,
        description: raw.description,
        bannerUrl: raw.bannerUrl,
        isPremium: raw.isPremium,
        createdAt: raw.createdAt,
        workouts: raw.workouts.map(PrismaWorkoutMapper.toDomain),
      },
      new UniqueEntityId(raw.id),
    )

    return bundle
  }

  static toPrisma(bundle: Bundle): Prisma.BundleUncheckedCreateInput {
    return {
      id: bundle.id.toString(),
      name: bundle.name,
      description: bundle.description,
      bannerUrl: bundle.bannerUrl,
      isPremium: bundle.isPremium,
      createdAt: bundle.createdAt,
      workouts: {
        connect: bundle.workouts.map((workout) => ({
          id: workout.id.toString(),
        })),
      },
    }
  }
}
