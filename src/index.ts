import winston from "winston"

import levels, {highestLevel} from "./levels"
import BrowserConsole from "./transports/BrowserConsole"

const createLogger = (): winston.Logger => {
  return winston.createLogger({
    level: highestLevel,
    levels,
    transports: new BrowserConsole(),
  })
}

export default createLogger
