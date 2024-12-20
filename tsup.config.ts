import type { Options } from 'tsup'

export const tsup: Options = {
  entry: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.e2e-spec.ts'],
  outDir: 'build',
}
