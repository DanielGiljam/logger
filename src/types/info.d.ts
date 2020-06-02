type Info<L extends string> = {
  level: L;
  message: any;
  LEVEL_SYMBOL: L;
  MESSAGE_SYMBOL: any;
  SPLAT_SYMBOL: any[];
} & {
  [key: string]: any;
}

// eslint-disable-next-line no-undef
export default Info
