import {LEVEL} from "triple-beam"
import Transport from "winston-transport"

import {Info} from "../../types/winston"

import functions from "./functions"
import {Level} from "./levels"

export type BrowserConsoleFunction<
  L extends Level = Level,
  MS = any,
  ME extends object = {[key: string]: any}
> = (this: BrowserConsole, info: Info<L, MS, ME>) => void

class BrowserConsole extends Transport {
  public log(info: Info<Level>, callback: () => void): void {
    setImmediate(() => {
      this.emit("logged", info)
    })
    const func = BrowserConsole._FUNCTIONS_MAP.get(info[LEVEL])
    if (func) func.call(this, info)
    callback()
  }

  // TODO: research if there's a cleaner way to initialize a Map
  private static readonly _FUNCTIONS_MAP = new Map<
    Level,
    BrowserConsoleFunction
  >(
    Object.entries(functions) as Iterable<
      readonly [Level, BrowserConsoleFunction]
    >,
  )
}

export default BrowserConsole
