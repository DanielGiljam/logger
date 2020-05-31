import winston from "winston"

import browserConsoleFormat from "./formats/browserConsoleFormat"
import levels, {highestLevel} from "./levels"
import BrowserConsole from "./transports/BrowserConsole"
import {Logger} from "./types/winston"

interface LoggerOptions {
  label?: string;
}

const createLogger = ({label}: LoggerOptions = {}): Logger => {
  return (winston.createLogger({
    level: highestLevel,
    levels,
    transports: new BrowserConsole({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({label}),
        browserConsoleFormat(),
      ),
    }),
  }) as unknown) as Logger
}

export default createLogger
