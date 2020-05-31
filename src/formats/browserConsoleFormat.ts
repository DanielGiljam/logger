import {Format, TransformFunction, format} from "logform"
import {LEVEL, SPLAT} from "triple-beam"

import {Levels} from "../levels"
import {Info} from "../types/winston"
import merge from "../util/merge"

export const defaultBrowserConsoleFormatOptions: BrowserConsoleFormatOptions = {
  style: {
    label: (info, opts): string => `color: ${opts.colors[info[LEVEL]].label}`,
    message: (info, opts): string => `color: ${opts.colors[info[LEVEL]].label}`,
  },
  colors: {
    error: {
      label: "black",
      message: "black",
    },
    warn: {
      label: "black",
      message: "black",
    },
    info: {
      label: "black",
      message: "black",
    },
    debug: {
      label: "black",
      message: "black",
    },
    assert: {
      label: "black",
      message: "black",
    },
    clear: {
      label: "black",
      message: "black",
    },
    count: {
      label: "black",
      message: "black",
    },
    countReset: {
      label: "black",
      message: "black",
    },
    group: {
      label: "black",
      message: "black",
    },
    groupCollapsed: {
      label: "black",
      message: "black",
    },
    groupEnd: {
      label: "black",
      message: "black",
    },
    profile: {
      label: "black",
      message: "black",
    },
    profileEnd: {
      label: "black",
      message: "black",
    },
    table: {
      label: "black",
      message: "black",
    },
    time: {
      label: "black",
      message: "black",
    },
    timeEnd: {
      label: "black",
      message: "black",
    },
    timeLog: {
      label: "black",
      message: "black",
    },
    timeStamp: {
      label: "black",
      message: "black",
    },
    trace: {
      label: "black",
      message: "black",
    },
  },
}

const parts: Part[] = ["label", "message"]

type Part = "label" | "message"

type TransformFunctionForward<R> = (
  ...params: Parameters<TransformFunction>
) => R

interface BrowserConsoleFormatOptions {
  style: {
    [K in Part]: (
      info: Info<Levels>,
      opts: BrowserConsoleFormatOptions
    ) => string
  };
  colors: {
    [K in Levels]: {
      [K in Part]: string
    } & {
      [key: string]: string;
    }
  } & {
    allLevels?: {
      [key: string]: string;
    };
  };
}

const browserConsoleFormat = format((info, opts) => {
  const mergedOpts: BrowserConsoleFormatOptions = merge(
    defaultBrowserConsoleFormatOptions,
    opts,
  )
  const styles: string[] = []
  info.message = parts
    .map((part) => {
      styles.push(mergedOpts.style[part](info as Info<Levels>, mergedOpts))
      return info[name]
    })
    .join("")
  if (!info[SPLAT]) info[SPLAT] = []
  info[SPLAT].splice(0, 0, ...styles)
  return info
}) as (opts: Partial<BrowserConsoleFormatOptions>) => Format

export default browserConsoleFormat
