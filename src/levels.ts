export const highestLevel = "trace"

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
}

export type Levels = keyof typeof levels

export default levels
