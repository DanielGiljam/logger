export type FunctionMap<L extends string> = {
  [K in L]: (...args: any[]) => void
}

type Logger<L extends string, FM extends FunctionMap<L>> = {
  [K in keyof FM]: FM[K]
}

// eslint-disable-next-line no-undef
export default Logger
