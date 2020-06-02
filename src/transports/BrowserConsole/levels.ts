const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  assert: 3,
  clear: 3,
  count: 3,
  countReset: 3,
  group: 3,
  groupCollapsed: 3,
  groupEnd: 3,
  profile: 3,
  profileEnd: 3,
  table: 3,
  time: 3,
  timeEnd: 3,
  timeLog: 3,
  timeStamp: 3,
  trace: 4,
}

export const highestLevel = "trace"

export type Level = keyof typeof levels

export default levels
