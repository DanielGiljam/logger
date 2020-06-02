import winston from "winston"

import Logger, {FunctionMap} from "./types/logger"

interface EnvironmentSpecificLoggerOptions {
  loggerOptions?: winston.LoggerOptions;
  proxyHandler?: ProxyHandler<winston.Logger>;
}

interface LoggerOptions {
  detectEnvironment?: () => "server-side" | "client-side";
  serverSide?: EnvironmentSpecificLoggerOptions;
  clientSide?: EnvironmentSpecificLoggerOptions;
}

const createLogger = <L extends string, FM extends FunctionMap<L>>({
  detectEnvironment,
  serverSide,
  clientSide,
}: LoggerOptions = {}): Logger<L, FM> => {
  // TODO: implement a default detect environment
  const environment = detectEnvironment?.() || "client-side"
  if (environment === "server-side") {
    return (new Proxy(
      winston.createLogger(serverSide?.loggerOptions),
      serverSide?.proxyHandler || {},
    ) as unknown) as Logger<L, FM>
  } else {
    return (new Proxy(
      winston.createLogger(clientSide?.loggerOptions),
      clientSide?.proxyHandler || {},
    ) as unknown) as Logger<L, FM>
  }
}

export default createLogger
