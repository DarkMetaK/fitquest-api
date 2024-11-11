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
  await prisma.raffle.deleteMany()

  const uploadsUrl = 'http://localhost:3333/uploads'

  const firstExercise = await prisma.exercise.create({
    data: {
      name: 'Flexão de Braço',
      instructions:
        'A flexão de braço é um ótimo exercício para o peito e os tríceps.',
      estimatedCalories: 100,
      duration: 100,
      repetitions: 10,
      targetedRegions: ['CHEST', 'ARMS'],
      previewUrl: `${uploadsUrl}/exercises/example-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/example.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    },
  })

  const secondExercise = await prisma.exercise.create({
    data: {
      name: 'Agachamento',
      instructions:
        'O agachamento trabalha principalmente as pernas e os glúteos.',
      estimatedCalories: 80,
      duration: 90,
      repetitions: 15,
      targetedRegions: ['LEGS', 'GLUTES'],
      previewUrl: `${uploadsUrl}/exercises/example-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/example.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
    },
  })

  const thirdExercise = await prisma.exercise.create({
    data: {
      name: 'Prancha',
      instructions: 'A prancha fortalece o abdômen e a região lombar.',
      estimatedCalories: 70,
      duration: 60,
      repetitions: 1,
      targetedRegions: ['CORE', 'BACK'],
      previewUrl: `${uploadsUrl}/exercises/example-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/example.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
    },
  })

  const fourthExercise = await prisma.exercise.create({
    data: {
      name: 'Afundo',
      instructions:
        'O afundo é excelente para os músculos das pernas e glúteos.',
      estimatedCalories: 90,
      duration: 100,
      repetitions: 12,
      targetedRegions: ['LEGS', 'GLUTES'],
      previewUrl: `${uploadsUrl}/exercises/example-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/example.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
    },
  })

  const fifthExercise = await prisma.exercise.create({
    data: {
      name: 'Burpee',
      instructions: 'O burpee trabalha o corpo todo e melhora a resistência.',
      estimatedCalories: 120,
      duration: 120,
      repetitions: 10,
      targetedRegions: ['FULL_BODY'],
      previewUrl: `${uploadsUrl}/exercises/example-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/example.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
    },
  })

  const bundle = await prisma.bundle.create({
    data: {
      name: 'Programa Iniciante',
      description:
        'O Programa de Treino Iniciante é perfeito para quem está começando a treinar, com exercícios simples e eficazes.',
      bannerUrl: `${uploadsUrl}/bundles/example-banner-1.jpg`,
      isPremium: false,
    },
  })

  const firstWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 1',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-1.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const secondWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 2',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-2.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const thirdWorkout = await prisma.workout.create({
    data: {
      name: 'Dia 3',
      type: 'STANDARD',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-3.jpg`,
      availableCurrency: 10,
      availableExperience: 10,
      bundleId: bundle.id,
    },
  })

  const firstChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio 1',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-1.jpg`,
      availableCurrency: 50,
      availableExperience: 50,
      expiresAt: new Date(2024, 10, 30),
    },
  })

  const secondChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio 2',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-2.jpg`,
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
        workoutId: firstWorkout.id,
        exerciseId: fifthExercise.id,
        order: 5,
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
        workoutId: secondWorkout.id,
        exerciseId: fifthExercise.id,
        order: 5,
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
        workoutId: thirdWorkout.id,
        exerciseId: fifthExercise.id,
        order: 5,
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
        workoutId: firstChallenge.id,
        exerciseId: fifthExercise.id,
        order: 5,
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
      {
        workoutId: secondChallenge.id,
        exerciseId: fifthExercise.id,
        order: 5,
      },
    ],
  })

  await prisma.raffle.createMany({
    data: [
      {
        name: 'Kit de suplementos',
        bannerUrl: `${uploadsUrl}/raffles/supplements-draw.jpg`,
        description:
          'O kit de suplementos da Growth é perfeito para quem quer ganhar massa muscular. Contém Whey Protein, BCAA e Creatina.',
        price: 10,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'Kit de roupas',
        bannerUrl: `${uploadsUrl}/raffles/clothes-draw.jpg`,
        description:
          'O kit de roupas da Nike é perfeito para quem quer treinar com estilo. Contém camiseta, shorts e tênis.',
        price: 20,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'IPhone 13',
        bannerUrl: `${uploadsUrl}/raffles/iphone-draw.jpg`,
        description:
          'O iPhone 13 é perfeito para quem quer um smartphone de última geração. Contém câmera de alta resolução, processador rápido e bateria de longa duração.',
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
