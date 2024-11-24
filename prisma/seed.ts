import { PrismaClient, Workout } from '@prisma/client'

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

  // Exercises
  const situps = await prisma.exercise.create({
    data: {
      name: 'Abdominais',
      instructions: [
        'Deite-se de costas com os joelhos dobrados e os pés apoiados no chão.',
        'Coloque as mãos atrás da cabeça com os cotovelos apontando para fora.',
        'Ativando os abdominais, levante lentamente a parte superior do corpo do chão, curvando-se para a frente até que o tronco fique em um ângulo de 45 graus.',
        'Pare por um momento no topo e, em seguida, abaixe lentamente a parte superior do corpo de volta à posição inicial.',
        'Repita pelo número estabelecido de repetições.',
      ],
      estimatedCalories: 60,
      duration: 60,
      repetitions: 20,
      targetedRegions: ['ABS'],
      previewUrl: `${uploadsUrl}/exercises/situp-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/situp.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=1fbU_MkV7NE',
    },
  })

  const airBike = await prisma.exercise.create({
    data: {
      name: 'Bicicleta no Ar',
      instructions: [
        'Deite-se de costas com as mãos atrás da cabeça.',
        'Levante as pernas do chão e dobre os joelhos em um ângulo de 90 graus.',
        'Traga o cotovelo direito em direção ao joelho esquerdo enquanto estica simultaneamente a perna direita.',
        'Volte à posição inicial e repita o movimento no lado oposto, aproximando o cotovelo esquerdo do joelho direito enquanto estica a perna esquerda.',
        'Continue alternando os lados em um movimento de pedalada pelo número estabelecido de repetições.',
      ],
      estimatedCalories: 70,
      duration: 60,
      targetedRegions: ['ABS', 'CORE'],
      previewUrl: `${uploadsUrl}/exercises/airbike-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/airbike.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
    },
  })

  const allFourSquadStretch = await prisma.exercise.create({
    data: {
      name: 'Alongamento de Quadrúpede',
      instructions: [
        'Comece de quatro, com as mãos diretamente sob os ombros e os joelhos diretamente sob os quadris.',
        'Estenda uma perna para trás, mantendo o joelho dobrado e o pé flexionado.',
        'Abaixe lentamente os quadris em direção ao chão, sentindo um alongamento nos quadríceps.',
        'Mantenha esta posição por 20-30 segundos.',
        'Troque as pernas e repita o alongamento do outro lado.',
      ],
      estimatedCalories: 30,
      duration: 60,
      targetedRegions: ['BACK', 'LEGS'],
      previewUrl: `${uploadsUrl}/exercises/all-four-squad-stretch-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/all-four-squad-stretch.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=ZP8r6WBHkXM',
    },
  })

  const alternateHeelTouchers = await prisma.exercise.create({
    data: {
      name: 'Toque Alternado no Calcanhar',
      instructions: [
        'Deite-se de costas com os joelhos dobrados e os pés apoiados no chão.',
        'Estenda os braços para os lados, paralelos ao chão.',
        'Engajando seus abdominais, levante os ombros do chão e estenda a mão direita em direção ao calcanhar direito.',
        'Volte à posição inicial e repita no lado esquerdo, estendendo a mão esquerda em direção ao calcanhar esquerdo.',
        'Continue alternando os lados para o número estabelecido de repetições.',
      ],
      estimatedCalories: 50,
      repetitions: 20,
      duration: 60,
      targetedRegions: ['ABS', 'OBLIQUES'],
      previewUrl: `${uploadsUrl}/exercises/alternate-heel-touchers-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/alternate-heel-touchers.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=JJ4j_u6mjyg',
    },
  })

  const ankleCircles = await prisma.exercise.create({
    data: {
      name: 'Círculos com os Tornozelos',
      instructions: [
        'Sente-se no chão com as pernas estendidas à sua frente.',
        'Levante uma perna do chão e gire o tornozelo em movimentos circulares.',
        'Execute o número desejado de círculos em uma direção e depois mude para a outra direção.',
        'Repita com a outra perna.',
      ],
      estimatedCalories: 20,
      duration: 60,
      targetedRegions: ['LEGS', 'ANKLES'],
      previewUrl: `${uploadsUrl}/exercises/ankle-circles-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/ankle-circles.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=T8Vn0Gml3OY',
    },
  })

  const archerPushUp = await prisma.exercise.create({
    data: {
      name: 'Flexão Arqueiro',
      instructions: [
        'Comece em uma posição de flexão com as mãos ligeiramente mais afastadas do que a largura dos ombros.',
        'Estenda um braço esticado para o lado, paralelo ao chão.',
        'Abaixe o corpo dobrando os cotovelos, mantendo as costas retas e o núcleo engajado.',
        'Empurre de volta para a posição inicial.',
        'Repita do outro lado, estendendo o braço oposto para o lado.',
        'Continue alternando os lados para o número estabelecido de repetições.',
      ],
      estimatedCalories: 80,
      repetitions: 12,
      duration: 80,
      targetedRegions: ['CHEST', 'ARMS'],
      previewUrl: `${uploadsUrl}/exercises/archer-push-up-preview.jpeg`,
      demonstrationUrl: `${uploadsUrl}/exercises/archer-push-up.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=Eu1t_Yj5h7E',
    },
  })

  const jumpingJacks = await prisma.exercise.create({
    data: {
      name: 'Polichinelos',
      instructions: [
        'Fique em pé com os pés juntos e os braços ao lado do corpo.',
        'Salte, afastando os pés e levantando os braços acima da cabeça.',
        'Ao pousar, volte rapidamente para a posição inicial.',
        'Repita o processo pelo tempo estimado.',
      ],
      estimatedCalories: 100,
      duration: 60,
      targetedRegions: ['FULL_BODY'],
      previewUrl: `${uploadsUrl}/exercises/jumping-jacks-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/jumping-jacks.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=2W4ZNSwoW_4',
    },
  })

  const plank = await prisma.exercise.create({
    data: {
      name: 'Prancha',
      instructions: [
        'Comece em uma posição de flexão com os cotovelos diretamente sob os ombros.',
        'Mantenha o corpo em linha reta dos calcanhares aos ombros.',
        'Ative os músculos do núcleo e segure a posição por um tempo determinado.',
      ],
      estimatedCalories: 50,
      duration: 60,
      targetedRegions: ['CORE', 'ABS'],
      previewUrl: `${uploadsUrl}/exercises/plank-preview.jpeg`,
      demonstrationUrl: `${uploadsUrl}/exercises/plank.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    },
  })

  const pushUps = await prisma.exercise.create({
    data: {
      name: 'Flexão de Braço',
      instructions: [
        'Comece em uma posição de prancha alta, com as mãos ligeiramente mais afastadas do que a largura dos ombros e os pés juntos.',
        'Envolva seu núcleo e abaixe o corpo em direção ao chão dobrando os cotovelos, mantendo o corpo em linha reta.',
        'Pare por um momento quando seu peito estiver logo acima do chão e, em seguida, empurre-se de volta à posição inicial esticando os braços.',
        'Repita pelo número estabelecido de repetições.',
      ],
      estimatedCalories: 80,
      repetitions: 15,
      duration: 80,
      targetedRegions: ['CHEST', 'ARMS'],
      previewUrl: `${uploadsUrl}/exercises/push-ups-preview.jpeg`,
      demonstrationUrl: `${uploadsUrl}/exercises/push-ups.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=_l3ySVKYVJ8',
    },
  })

  const mountainClimbers = await prisma.exercise.create({
    data: {
      name: 'Escalador',
      instructions: [
        'Comece em uma posição de prancha alta, com as mãos diretamente sob os ombros e o corpo em linha reta.',
        'Envolva seu núcleo e traga o joelho direito em direção ao peito, depois mude rapidamente e traga o joelho esquerdo em direção ao peito.',
        'Continue alternando as pernas em um movimento de corrida, mantendo os quadris baixos e o núcleo engajado.',
        'Mantenha um ritmo constante e respire uniformemente durante todo o exercício.',
        'Repita pelo tempo estabelecido.',
      ],
      estimatedCalories: 90,
      duration: 60,
      targetedRegions: ['CORE'],
      previewUrl: `${uploadsUrl}/exercises/mountain-climbers-preview.jpg`,
      demonstrationUrl: `${uploadsUrl}/exercises/mountain-climbers.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
    },
  })

  const squats = await prisma.exercise.create({
    data: {
      name: 'Agachamento',
      instructions: [
        'Fique em pé com os pés afastados na largura dos ombros, os dedos apontando ligeiramente para fora.',
        'Abaixe o corpo dobrando os joelhos e empurrando os quadris para trás, como se estivesse sentado em uma cadeira.',
        'Mantenha o peito erguido e as costas retas durante todo o movimento.',
        'Abaixe-se até que suas coxas fiquem paralelas ao chão ou o mais baixo que você puder confortavelmente.',
        'Pare por um momento na parte inferior e, em seguida, empurre os calcanhares para retornar à posição inicial.',
        'Repita para o número estabelecido de repetições.',
      ],
      estimatedCalories: 70,
      repetitions: 15,
      duration: 60,
      targetedRegions: ['LEGS', 'GLUTES'],
      previewUrl: `${uploadsUrl}/exercises/squats-preview.jpeg`,
      demonstrationUrl: `${uploadsUrl}/exercises/squats.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
    },
  })

  const lunges = await prisma.exercise.create({
    data: {
      name: 'Avanço',
      instructions: [
        'Fique em pé com os pés afastados na largura dos quadris e as mãos nos quadris.',
        'Dê um grande passo à frente com o pé direito, abaixando o corpo para uma posição de estocada.',
        'Dobre o joelho direito em cerca de 90 graus, mantendo o joelho alinhado com o tornozelo.',
        'Empurre com o pé direito e volte à posição inicial.',
        'Repita com a perna esquerda, alternando os lados para o número estabelecido de repetições.',
      ],
      estimatedCalories: 60,
      repetitions: 10,
      duration: 60,
      targetedRegions: ['LEGS', 'GLUTES'],
      previewUrl: `${uploadsUrl}/exercises/lunges-preview.jpeg`,
      demonstrationUrl: `${uploadsUrl}/exercises/lunges.gif`,
      videoUrl: 'https://www.youtube.com/watch?v=COKYKgQ8KR0',
    },
  })

  // Bundles
  const beginnersBundle = await prisma.bundle.create({
    data: {
      name: 'Programa Iniciante',
      description:
        'O Programa de Treino Iniciante é perfeito para quem está começando a treinar, com exercícios simples e eficazes.',
      bannerUrl: `${uploadsUrl}/bundles/beginners-banner.jpg`,
      isPremium: false,
    },
  })

  const weightBundle = await prisma.bundle.create({
    data: {
      name: 'Programa Perda de Peso',
      description:
        'O Programa de Treino para Perda de Peso é perfeito para quem quer emagrecer e tonificar o corpo.',
      bannerUrl: `${uploadsUrl}/bundles/weight-banner.jpeg`,
      isPremium: true,
    },
  })

  const musclesBundle = await prisma.bundle.create({
    data: {
      name: 'Programa Tonificação',
      description:
        'O Programa de Treino para Tonificação é perfeito para quem quer definir os músculos e ganhar força.',
      bannerUrl: `${uploadsUrl}/bundles/muscles-banner.jpeg`,
      isPremium: true,
    },
  })

  // Generating workouts for begginers bundle
  const begginersBundleWorkouts: Workout[] = []
  for (let i = 0; i < 10; i++) {
    begginersBundleWorkouts.push(
      await prisma.workout.create({
        data: {
          name: `Dia ${i + 1}`,
          type: 'STANDARD',
          bannerUrl: `${uploadsUrl}/workouts/example-banner-${i + 1}.jpg`,
          availableCurrency: 10,
          availableExperience: 10,
          bundleId: beginnersBundle.id,
        },
      }),
    )
  }

  // Generating workouts for weight bundle
  const weightBundleWorkouts: Workout[] = []
  for (let i = 0; i < 10; i++) {
    weightBundleWorkouts.push(
      await prisma.workout.create({
        data: {
          name: `Dia ${i + 1}`,
          type: 'STANDARD',
          bannerUrl: `${uploadsUrl}/workouts/example-banner-${i + 1}.jpg`,
          availableCurrency: 10,
          availableExperience: 10,
          bundleId: weightBundle.id,
        },
      }),
    )
  }

  // Generating workouts for muscles bundle
  const musclesBundleWorkouts: Workout[] = []
  for (let i = 0; i < 10; i++) {
    musclesBundleWorkouts.push(
      await prisma.workout.create({
        data: {
          name: `Dia ${i + 1}`,
          type: 'STANDARD',
          bannerUrl: `${uploadsUrl}/workouts/example-banner-${i + 1}.jpg`,
          availableCurrency: 10,
          availableExperience: 10,
          bundleId: musclesBundle.id,
        },
      }),
    )
  }

  // Isolated challenges
  const firstChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio Geral',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-1.jpg`,
      availableCurrency: 50,
      availableExperience: 50,
      expiresAt: new Date(2024, 10, 30),
    },
  })

  const secondChallenge = await prisma.workout.create({
    data: {
      name: 'Desafio Peitoral',
      type: 'CHALLENGE',
      bannerUrl: `${uploadsUrl}/workouts/example-banner-2.jpeg`,
      availableCurrency: 50,
      availableExperience: 50,
      expiresAt: new Date(2024, 10, 30),
    },
  })

  // Workouts steps
  const exercises = [
    situps,
    airBike,
    allFourSquadStretch,
    alternateHeelTouchers,
    ankleCircles,
    archerPushUp,
    jumpingJacks,
    plank,
    pushUps,
    mountainClimbers,
    squats,
    lunges,
  ]

  // Generates random workout steps for each workout of Beginners Bundle
  for (const workout of begginersBundleWorkouts) {
    const shuffledExercises = exercises
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
    const workoutSteps = shuffledExercises.map((exercise, index) => ({
      workoutId: workout.id,
      exerciseId: exercise.id,
      order: index + 1,
    }))
    await prisma.workoutStep.createMany({
      data: workoutSteps,
    })
  }

  // Generates random workout steps for each workout of Weight Bundle
  for (const workout of weightBundleWorkouts) {
    const shuffledExercises = exercises
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
    const workoutSteps = shuffledExercises.map((exercise, index) => ({
      workoutId: workout.id,
      exerciseId: exercise.id,
      order: index + 1,
    }))
    await prisma.workoutStep.createMany({
      data: workoutSteps,
    })
  }

  // Generates random workout steps for each workout of muscles Bundle
  for (const workout of musclesBundleWorkouts) {
    const shuffledExercises = exercises
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
    const workoutSteps = shuffledExercises.map((exercise, index) => ({
      workoutId: workout.id,
      exerciseId: exercise.id,
      order: index + 1,
    }))
    await prisma.workoutStep.createMany({
      data: workoutSteps,
    })
  }

  // Generates random workout steps for the first challenge
  const firstChallengeSteps = exercises
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)
    .map((exercise, index) => ({
      workoutId: firstChallenge.id,
      exerciseId: exercise.id,
      order: index + 1,
    }))

  await prisma.workoutStep.createMany({
    data: firstChallengeSteps,
  })

  // Generates random workout steps for the second challenge
  const secondChallengeSteps = exercises
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)
    .map((exercise, index) => ({
      workoutId: secondChallenge.id,
      exerciseId: exercise.id,
      order: index + 1,
    }))

  await prisma.workoutStep.createMany({
    data: secondChallengeSteps,
  })

  // Raffles
  await prisma.raffle.createMany({
    data: [
      {
        name: 'Kit de suplementos',
        bannerUrl: `${uploadsUrl}/raffles/supplements-draw.jpg`,
        description:
          'Participe do sorteio e concorra a um kit de suplementos da Growth, perfeito para quem quer ganhar massa muscular. Contém Whey Protein, BCAA e Creatina. Serão escolhido dois ganhadores!',
        price: 10,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'Kit de roupas',
        bannerUrl: `${uploadsUrl}/raffles/clothes-draw.jpg`,
        description:
          'Participe do sorteio e concorra a um kit de roupas da Nike, perfeito para quem quer treinar com estilo. Contém camiseta, shorts e tênis. Apenas um ganhador!',
        price: 10,
        isPremium: false,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: '1 ano SmartFit',
        bannerUrl: `${uploadsUrl}/raffles/smartfit-draw.jpg`,
        description:
          'Participe do sorteio e ganhe 1 ano de academia grátis na SmartFit. Aproveite para treinar em qualquer unidade do Brasil. Apenas um ganhador!',
        price: 20,
        isPremium: true,
        expiresAt: new Date(2024, 10, 30),
      },
      {
        name: 'Esteira Ergométrica',
        bannerUrl: `${uploadsUrl}/raffles/dream-fitness-dr2110-draw.jpg`,
        description:
          'Participe do sorteio e ganhe uma esteira ergométrica "Dream Fitness DR2110" para treinar em casa. Aproveite para manter a forma sem sair de casa. Apenas um ganhador!',
        price: 50,
        isPremium: true,
        expiresAt: new Date(2024, 10, 30),
      },
    ],
  })
}
seed().then(() => {
  console.log('Database seeded!')
})
