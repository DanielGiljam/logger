import Transport from "winston-transport"

// TODO: BrowserConsole transport
class BrowserConsole extends Transport {
  log(info, callback): void {
    setImmediate(() => {
      this.emit("logged", info)
    })
    callback()
  }
}

export default BrowserConsole
