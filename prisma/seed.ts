import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()
  await prisma.workoutStep.deleteMany()
  await prisma.exercise.deleteMany()
  await prisma.workout.deleteMany()
  await prisma.bundle.deleteMany()
  await prisma.finishedWorkout.deleteMany()
  await prisma.bundleSubscription.deleteMany()

  const uploadsUrl = 'http://localhost:3333/uploads'

  const firstExercise = await prisma.exercise.create({
    data: {
      name: 'Pushups',
      instructions: 'Pushups are a great exercise for your chest and triceps.',
      estimatedCalories: 100,
      duration: 100,
      repetitions: 10,
      targetedRegions: ['CHEST', 'ARMS'],
      previewUrl:
        'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg?format=750w',
      demonstrationUrl: `${uploadsUrl}/abdutora.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=lkvSelJ0tQ8',
    },
  })

  const secondExercise = await prisma.exercise.create({
    data: {
      name: 'Squats',
      instructions: 'Squats are great for your legs and glutes.',
      estimatedCalories: 150,
      duration: 150,
      repetitions: 15,
      targetedRegions: ['GLUTES'],
      previewUrl:
        'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg?format=750w',
      demonstrationUrl: `${uploadsUrl}/abdutora.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    },
  })

  const thirdExercise = await prisma.exercise.create({
    data: {
      name: 'Plank',
      instructions: 'Planks are great for your core.',
      estimatedCalories: 50,
      duration: 60,
      targetedRegions: ['CHEST', 'ARMS'],
      previewUrl:
        'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg?format=750w',
      demonstrationUrl: `${uploadsUrl}/abdutora.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
    },
  })

  const fourthExercise = await prisma.exercise.create({
    data: {
      name: 'Crunches',
      instructions: 'Crunches are great for your abs.',
      estimatedCalories: 70,
      duration: 70,
      repetitions: 7,
      targetedRegions: ['ABS'],
      previewUrl:
        'https://images.squarespace-cdn.com/content/v1/58501b0cf5e23149e5589e12/1585601917653-J791ZN5ZWSK565NIZSS1/1_WZmDgcJO40Va5mVgdfbz7g%402x.jpeg?format=750w',
      demonstrationUrl: `${uploadsUrl}/abdutora.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=MKmrqcoCZ-M',
    },
  })

  const bundle = await prisma.bundle.create({
    data: {
      name: 'Iniciante',
      bannerUrl: `${uploadsUrl}/banner-iniciante.png`,
      isPremium: false,
    },
  })

  const firstWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 1',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/banner-dia-1.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const secondWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 2',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/banner-dia-2.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const thirdWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 3',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/banner-dia-3.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const firstChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio 1',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/banner-desafio-1.jpg`,
      availableCurrency: 50,
      availableExperience: 50,
      expiresAt: new Date(2024, 10, 30),
    },
  })

  const secondChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio 2',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/banner-desafio-2.jpg`,
      availableCurrency: 50,
      availableExperience: 50,
      expiresAt: new Date(2024, 10, 30),
    },
  })

  await prisma.workoutStep.createMany({
    data: [
      {
        workoutId: firstWorkout.id,
        exerciseId: firstExercise.id,
        order: 1,
      },
      {
        workoutId: firstWorkout.id,
        exerciseId: secondExercise.id,
        order: 2,
      },
      {
        workoutId: firstWorkout.id,
        exerciseId: thirdExercise.id,
        order: 3,
      },
      {
        workoutId: firstWorkout.id,
        exerciseId: fourthExercise.id,
        order: 4,
      },
      {
        workoutId: secondWorkout.id,
        exerciseId: firstExercise.id,
        order: 1,
      },
      {
        workoutId: secondWorkout.id,
        exerciseId: secondExercise.id,
        order: 2,
      },
      {
        workoutId: secondWorkout.id,
        exerciseId: thirdExercise.id,
        order: 3,
      },
      {
        workoutId: secondWorkout.id,
        exerciseId: fourthExercise.id,
        order: 4,
      },
      {
        workoutId: thirdWorkout.id,
        exerciseId: firstExercise.id,
        order: 1,
      },
      {
        workoutId: thirdWorkout.id,
        exerciseId: secondExercise.id,
        order: 2,
      },
      {
        workoutId: thirdWorkout.id,
        exerciseId: thirdExercise.id,
        order: 3,
      },
      {
        workoutId: thirdWorkout.id,
        exerciseId: fourthExercise.id,
        order: 4,
      },
      {
        workoutId: firstChallenge.id,
        exerciseId: firstExercise.id,
        order: 1,
      },
      {
        workoutId: firstChallenge.id,
        exerciseId: secondExercise.id,
        order: 2,
      },
      {
        workoutId: firstChallenge.id,
        exerciseId: thirdExercise.id,
        order: 3,
      },
      {
        workoutId: firstChallenge.id,
        exerciseId: fourthExercise.id,
        order: 4,
      },
      {
        workoutId: secondChallenge.id,
        exerciseId: firstExercise.id,
        order: 1,
      },
      {
        workoutId: secondChallenge.id,
        exerciseId: secondExercise.id,
        order: 2,
      },
      {
        workoutId: secondChallenge.id,
        exerciseId: thirdExercise.id,
        order: 3,
      },
      {
        workoutId: secondChallenge.id,
        exerciseId: fourthExercise.id,
        order: 4,
      },
    ],
  })

  await prisma.raffle.createMany({
    data: [
      {
        name: 'Kit de suplementos',
        bannerUrl: `${uploadsUrl}/supplements-draw.jpg`,
        price: 10,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'Kit de roupas',
        bannerUrl: `${uploadsUrl}/clothes-draw.jpg`,
        price: 20,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'IPhone 13',
        bannerUrl: `${uploadsUrl}/iphone-draw.jpg`,
        price: 30,
        isPremium: true,
        expiresAt: new Date(2024, 10, 30),
      },
    ],
  })
}
seed().then(() => {
  console.log('Database seeded!')
})
