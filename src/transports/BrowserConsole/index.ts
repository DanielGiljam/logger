import {LEVEL} from "triple-beam"
import Transport from "winston-transport"

import {Levels} from "../../levels"
import {Info} from "../../types/winston"

import functions from "./functions"

type Message = boolean | string | Error | undefined

export type BrowserConsoleFunction<
  LVL extends Levels = Levels,
  META extends object = {},
  MSG extends Message = string
> = (this: BrowserConsole, info: Info<LVL, META, MSG>) => void

// TODO: BrowserConsole transport
class BrowserConsole extends Transport {
  public log(info: Info<Levels>, callback: () => void): void {
    setImmediate(() => {
      this.emit("logged", info)
    })
    const func = BrowserConsole._FUNCTIONS_MAP.get(info[LEVEL])
    if (func) func.call(this, info)
    callback()
  }

  // TODO: research if there's a cleaner way to initialize a Map
  private static readonly _FUNCTIONS_MAP = new Map<
    Levels,
    BrowserConsoleFunction
  >(
    Object.entries(functions) as Iterable<
      readonly [Levels, BrowserConsoleFunction]
    >,
  )
}

export default BrowserConsole
