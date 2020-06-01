import {LEVEL} from "triple-beam"

import {Options} from "./format"
import {Level} from "./levels"

const levelsThatShouldBePrintedAsDebug: Level[] = [
  "assert",
  "count",
  "countReset",
  "group",
  "groupCollapsed",
  "profile",
  "profileEnd",
  "table",
  "time",
  "timeEnd",
  "timeLog",
  "timeStamp",
]
const printAsDebugPattern = new RegExp(
  `^(${levelsThatShouldBePrintedAsDebug.join("|")})$`,
)
const getPrintableLevel = (level: Level): string =>
  printAsDebugPattern.test(level) ? "DEBUG" : level.toUpperCase()

const defaultFormatOptions = (colors: Options["colors"]): Options => ({
  colors,
  format: {
    level: (info, opts): string =>
      opts.printLevel ? getPrintableLevel(info[LEVEL]) + " " : "",
    time: (info, opts): string => (opts.printTimestamp ? info.time + " " : ""),
    label: (info): string => `[${info.label}] `,
    message: (info): string => info.message,
  },
  style: {
    level: (info, opts): string =>
      opts.colors?.[info[LEVEL]]?.level
        ? `color: ${opts.colors[info[LEVEL]]?.level}`
        : "",
    time: (info, opts): string =>
      opts.colors?.[info[LEVEL]]?.time
        ? `color: ${opts.colors[info[LEVEL]]?.time}`
        : "",
    label: (info, opts): string =>
      opts.colors?.[info[LEVEL]]?.label
        ? `color: ${opts.colors[info[LEVEL]]?.label}`
        : "",
    message: (info, opts): string =>
      opts.colors?.[info[LEVEL]]?.message
        ? `color: ${opts.colors[info[LEVEL]]?.message}`
        : "",
  },
  printLevel: false,
  printTimestamp: true,
})

export default defaultFormatOptions
