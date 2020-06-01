import createLogger, {Level} from "../src"
import Logger from "../src/types/logger"

const logger = createLogger({label: "My Label"})

const basicTests = (
  logger: Logger,
  level: Exclude<
    Level,
    | "assert"
    | "clear"
    | "groupEnd"
    | "profile"
    | "profileEnd"
    | "table"
    | "time"
    | "timeLog"
    | "timeEnd"
    | "timeStamp"
  >,
): void => {
  logger.groupCollapsed(`Basic tests for level "${level}"`)
  logger[level](`This is a "${level}" message`)
  logger[level](
    `This is a "${level}" message that uses %s interpolation (%d times)`,
    "string",
    2,
  )
  logger[
    level
  ](
    `This is a "${level}" message that uses %s interpolation (%d times) and has additional arguments`,
    "string",
    2,
    24,
    {x: 256, y: 128},
  )
  logger[level](
    `This is a "${level}" message that uses %s interpolation (%d times) and has additional arguments and where the first additional argument is an object literal`,
    "string",
    2,
    {x: 256, y: 128},
    "test",
    false,
  )
  logger[level](
    `This is a "${level}" message that has additional arguments and where the first additional argument is an object literal`,
    {x: 256, y: 128},
    "test",
    12416,
  )
  logger[level](
    `This is a "${level}" message that has additional arguments`,
    24,
    {x: 256, y: 128},
    "test",
    12416,
  )
  logger[level](
    `The following message is level "${level}" and was sent a single non-string value as argument`,
  )
  logger[level](12416)
  logger[level](
    `The following message is level "${level}" and was sent multiple non-string value as arguments`,
  )
  logger[level](12416, {x: 256, y: 128}, "test", [false, true])
  logger[level](
    `The following message is level "${level}" and was sent a single object as argument`,
  )
  logger[level]({x: 256, y: 128})
  logger[level](
    `The following message is level "${level}" and was sent multiple objects as arguments`,
  )
  logger[level]({x: 256, y: 128}, {xy: [256, 128], z: 0})
  logger.groupEnd()
}

if (typeof window !== "undefined") {
  logger.clear()
  basicTests(logger, "error")
  basicTests(logger, "warn")
  basicTests(logger, "info")
  basicTests(logger, "debug")
  basicTests(logger, "trace")
}

const Index = (): JSX.Element => {
  return <h1>Logger Test In Browser</h1>
}
export default Index
