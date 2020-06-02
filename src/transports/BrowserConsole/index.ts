import {LEVEL} from "triple-beam"
import Transport, {TransportStreamOptions} from "winston-transport"

import Info from "../../types/info"

export type BrowserConsoleFunction<L extends string> = (
  this: BrowserConsole<L>,
  info: Info<L>
) => void

export type BrowserConsoleOptions<L extends string> = TransportStreamOptions & {
  functions: {[K in L]: BrowserConsoleFunction<L>};
}

class BrowserConsole<L extends string> extends Transport {
  private readonly _functionsMap: Map<L, BrowserConsoleFunction<L>>

  constructor(opts?: BrowserConsoleOptions<L>) {
    super(opts)
    this._functionsMap = new Map<L, BrowserConsoleFunction<L>>(
      Object.entries(opts?.functions || {}) as Iterable<
        readonly [L, BrowserConsoleFunction<L>]
      >,
    )
  }

  public log(info: Info<L>, callback: () => void): void {
    setImmediate(() => {
      this.emit("logged", info)
    })
    const func = this._functionsMap.get(info[LEVEL])
    if (func) func.call(this, info)
    callback()
  }
}

export default BrowserConsole
