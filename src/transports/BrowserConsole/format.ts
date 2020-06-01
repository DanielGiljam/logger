import logform from "logform"
import {LEVEL, SPLAT} from "triple-beam"

import {Info} from "../../types/winston"

import {Level} from "./levels"

const parts: Part[] = ["level", "time", "label", "message"]

const nonSplattableLevels = [
  "profile",
  "profileEnd",
  "table",
  "time",
  "timeLog",
  "timeEnd",
  "timeStamp",
]
const doNotSplatPattern = new RegExp(`^(${nonSplattableLevels.join("|")})$`)

const nonStylableLevels = ["count", "countReset", ...nonSplattableLevels]
const doNotStylePattern = new RegExp(`^(${nonStylableLevels.join("|")})$`)

const splat = (info: Info<Level>, opts: Options): void => {
  if (!opts.format?.message) {
    if (!opts.format) opts.format = {}
    opts.format.message = (info): string => info.message
  }
  info.message = parts.map((part) => opts.format?.[part]?.(info, opts)).join("")
}

const splatAndStyle = (info: Info<Level>, opts: Options): void => {
  const styles: string[] = []
  if (!opts.format?.message) {
    if (!opts.format) opts.format = {}
    opts.format.message = (info): string => info.message
  }
  info.message = parts
    .map((part) => {
      styles.push(opts.style?.[part]?.(info, opts) || "")
      return "%c" + (opts.format?.[part]?.(info, opts) || "")
    })
    .join("")
  if (!info[SPLAT]) info[SPLAT] = []
  info[SPLAT].splice(0, 0, ...styles)
}

type Part = "level" | "time" | "label" | "message"

export interface Options<L extends Level = Level, P extends Part = Part> {
  colors?: {
    [K in L | "allLevels"]?: {
      [key: string]: string;
    }
  };
  format?: {
    [K in P]?: (info: Info<L>, opts: Options<L, P>) => string
  };
  style?: {
    [K in P]?: (info: Info<L>, opts: Options<L, P>) => string
  };
  printLevel?: boolean;
  printTimestamp?: boolean;
}

const browserConsoleFormat = logform.format((info, opts: Options) => {
  if (doNotSplatPattern.test(info[LEVEL])) {
    return info
  } else if (doNotStylePattern.test(info[LEVEL])) {
    splat(info as Info<Level>, opts)
    return info
  } else {
    if (info[LEVEL] === "assert") {
      info.assertion = info.message
      info.message = info[SPLAT]?.shift()
    }
    splatAndStyle(info as Info<Level>, opts)
    return info
  }
}) as (opts?: Options) => logform.Format

export default browserConsoleFormat
