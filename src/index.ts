import winston from "winston"

import levels, {highestLevel} from "./levels"
import BrowserConsole from "./transports/BrowserConsole"
import {Logger} from "./types/winston"

const createLogger = (): Logger => {
  return (winston.createLogger({
    level: highestLevel,
    levels,
    transports: new BrowserConsole(),
  }) as unknown) as Logger
}

export default createLogger
