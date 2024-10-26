import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    environmentMatchGlobs: [
      [
        '**/*.e2e-spec.ts',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
  },
  plugins: [tsconfigPaths()],
})
