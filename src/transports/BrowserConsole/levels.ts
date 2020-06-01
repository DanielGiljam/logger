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

export const colors = {
  debug: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  assert: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  clear: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  count: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  countReset: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  group: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  groupCollapsed: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  groupEnd: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  profile: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  profileEnd: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  table: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  time: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  timeEnd: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  timeLog: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  timeStamp: {
    level: "#5189F9",
    time: "#5189F9",
    label: "#5189F9",
    message: "#5189F9",
  },
  trace: {
    level: "#EE82EE",
    time: "#EE82EE",
    label: "#EE82EE",
    message: "#EE82EE",
  },
}

export type Level = keyof typeof levels

export default levels
