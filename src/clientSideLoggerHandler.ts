import {CustomWinstonLogger} from "./types/winston"

// TODO: write client-side logger traps!
const clientSideLoggerHandler: ProxyHandler<CustomWinstonLogger> = {}

export default clientSideLoggerHandler
