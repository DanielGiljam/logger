import createLogger from "../lib"
import {Levels} from "../lib/levels"
import {Logger} from "../lib/types/winston"

const logger = createLogger()

const someOtherArguments1 = [
  typeof FileReader !== "undefined" ? new FileReader() : {},
  21,
  {
    x: 342,
    y: 215,
  },
  "someOtherArguments1",
]

const someOtherArguments2 = [
  21,
  typeof FileReader !== "undefined" ? new FileReader() : {},
  "someOtherArguments2",
  {
    x: 342,
    y: 215,
  },
]

const someOtherArguments3 = [
  "someOtherArguments3",
  {
    x: 342,
    y: 215,
  },
  typeof FileReader !== "undefined" ? new FileReader() : {},
  21,
]

const someOtherArguments4 = [
  {
    x: 342,
    y: 215,
  },
  "someOtherArguments4",
  typeof FileReader !== "undefined" ? new FileReader() : {},
  21,
]

const basicTests = (logger: Logger, level: Levels): void => {
  logger[level](`This is a "${level}" message`)
  logger[level](
    `This is a "${level}" message + some other arguments 1`,
    ...someOtherArguments1,
  )
  logger[level](
    `This is a "${level}" message + some other other arguments 2`,
    ...someOtherArguments2,
  )
  logger[level](
    `This is a "${level}" message + some other other other arguments 3`,
    ...someOtherArguments3,
  )
  logger[level](
    `This is a "${level}" message + some other other other other arguments 4`,
    ...someOtherArguments4,
  )
  logger[level](...someOtherArguments1)
  logger[level](...someOtherArguments2)
  logger[level](...someOtherArguments3)
  logger[level](...someOtherArguments4)
  logger[level]({
    prop: "customObjectProperty",
    message: "The log function was called with one object literal argument",
  })
  logger[level]({prop: "customObjectProperty", prop2: "customObjectProperty2"})
  logger[level](
    {
      prop: "customObjectProperty",
      message: "The log function was called with one object literal argument",
    },
    "otherStuff",
  )
  logger[level](
    {prop: "customObjectProperty", prop2: "customObjectProperty2"},
    "otherStuff",
  )
}

// #region ERROR

logger.groupCollapsed("error")
basicTests(logger, "error")
logger.error(new Error("This is an Error object"))
logger.error(
  new Error("This is an Error object + some other arguments 1"),
  ...someOtherArguments1,
)
logger.error(
  new Error("This is an Error object + some other arguments 2"),
  ...someOtherArguments2,
)
logger.error(
  new Error("This is an Error object + some other arguments 3"),
  ...someOtherArguments3,
)
logger.error(
  new Error("This is an Error object + some other arguments 4"),
  ...someOtherArguments4,
)
logger.groupEnd()

// #endregion

// #region WARN

logger.groupCollapsed("warn")
basicTests(logger, "warn")
logger.groupEnd()

// #endregion

// #region INFO

logger.groupCollapsed("info")
basicTests(logger, "info")
logger.groupEnd()

// #endregion

// #region DEBUG

logger.groupCollapsed("debug")
basicTests(logger, "debug")
logger.groupEnd()

// #endregion

// #region ASSERT

// TODO: implement tests for logger.assert

// #endregion

// #region COUNT

// TODO: implement tests for logger.count

// #endregion

// #region COUNT_RESET

// TODO: implement tests for logger.countReset

// #endregion

// #region PROFILE

// TODO: implement tests for logger.profile

// #endregion

// #region PROFILE_END

// TODO: implement tests for logger.profileEnd

// #endregion

// #region TABLE

// TODO: implement tests for logger.table

// #endregion

// #region TIME

// TODO: implement tests for logger.time

// #endregion

// #region TIME_END

// TODO: implement tests for logger.timeEnd

// #endregion

// #region TIME_LOG

// TODO: implement tests for logger.timeLog

// #endregion

// #region TIMESTAMP

// TODO: implement tests for logger.timeStamp

// #endregion

// #region TRACE

logger.groupCollapsed("trace")
basicTests(logger, "trace")
logger.groupEnd()

// #endregion

// logger.http("This should not be a function")
// logger.clear()

const Index = (): JSX.Element => {
  return <h1>Logger Test In Browser</h1>
}
export default Index
