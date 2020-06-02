import {Format, format} from "logform"
import {LEVEL, SPLAT} from "triple-beam"

import Info from "../../types/info"

import {Level} from "./levels"

const getDoNotSplatPattern = <L extends string>(
  nonSplattableLevels: L[] = [],
): RegExp => new RegExp(`^(${nonSplattableLevels.join("|")})$`)

const getDoNotStylePattern = <L extends string>(
  nonStylableLevels: L[] = [],
): RegExp => new RegExp(`^(${nonStylableLevels.join("|")})$`)

const splat = <L extends string, P extends string>(
  info: Info<L>,
  opts: Options<L, P>,
): void => {
  if (!opts.format?.message) {
    if (!opts.format) opts.format = {}
    opts.format.message = (info): string => info.message
  }
  if (!opts.parts?.length) opts.parts = ["message"]
  info.message = opts.parts
    .map((part) => opts.format?.[part]?.(info, opts))
    .join("")
}

const splatAndStyle = <L extends string, P extends string>(
  info: Info<L>,
  opts: Options<L, P>,
): void => {
  const styles: string[] = []
  if (!opts.format?.message) {
    if (!opts.format) opts.format = {}
    opts.format.message = (info): string => info.message
  }
  if (!opts.parts?.length) opts.parts = ["message"]
  info.message = opts.parts
    .map((part) => {
      styles.push(opts.style?.[part]?.(info, opts) || "")
      return "%c" + (opts.format?.[part]?.(info, opts) || "")
    })
    .join("")
  if (!info[SPLAT]) info[SPLAT] = []
  info[SPLAT].splice(0, 0, ...styles)
}

export type Part = "level" | "time" | "label" | "message"

export interface Options<L extends string, P extends string> {
  colors?: {
    [K in L | "allLevels"]?: {
      [key: string]: string;
    }
  };
  format?: {
    [K in P | "message"]?: (info: Info<L>, opts: Options<L, P>) => string
  };
  style?: {
    [K in P | "message"]?: (info: Info<L>, opts: Options<L, P>) => string
  };
  printLevel?: boolean;
  printTimestamp?: boolean;
  nonSplattableLevels?: L[];
  nonStylableLevels?: L[];
  parts?: (P | "message")[];
}

// TODO: check type of info.message before assuming it's a string
const browserConsoleFormat = format((info, opts: Options<string, string>) => {
  if (getDoNotSplatPattern(opts.nonSplattableLevels).test(info[LEVEL])) {
    return info
  } else if (getDoNotStylePattern(opts.nonStylableLevels).test(info[LEVEL])) {
    splat(info as Info<string>, opts)
    return info
  } else {
    // TODO: move this piece of logic somewhere else (related to assert())
    if (info[LEVEL] === "assert") {
      info.assertion = info.message
      info.message = info[SPLAT]?.shift()
    }
    splatAndStyle(info as Info<string>, opts)
    return info
  }
}) as <L extends Level = Level, P extends Part = Part>(
  opts?: Options<L, P>
) => Format

export default browserConsoleFormat
