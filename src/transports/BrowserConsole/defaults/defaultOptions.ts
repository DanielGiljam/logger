import {Format} from "logform"

import functions from "../functions"
import {BrowserConsoleOptions} from "../index"
import {Level} from "../levels"

import defaultFormat, {DefaultFormatParameters} from "./defaultFormat"

interface DefaultOptionsParameters {
  level?: Level;
  silent?: boolean;
  format?: Format;
  defaultFormatOptions?: DefaultFormatParameters;
}

// TODO: create a merge function that merges specified options with the default set
const defaultOptions = ({
  level,
  silent,
  format,
  defaultFormatOptions,
}: DefaultOptionsParameters = {}): BrowserConsoleOptions<Level> => ({
  level,
  silent,
  format: format || defaultFormat(defaultFormatOptions),
  functions,
})

export default defaultOptions
