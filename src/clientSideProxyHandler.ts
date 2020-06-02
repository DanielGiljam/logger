import {Logger} from "winston"

// TODO: write client-side logger traps!
const clientSideProxyHandler: ProxyHandler<Logger> = {}

export default clientSideProxyHandler
