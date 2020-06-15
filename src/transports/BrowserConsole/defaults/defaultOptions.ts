import {Format} from "logform"

import functions from "../functions"
import {BrowserConsoleOptions} from "../index"
import {Level} from "../levels"

import defaultFormat, {DefaultFormatParameters} from "./defaultFormat"

interface DefaultOptionsParameters {
  level?: Level;
  silent?: boolean;
  format?: Format;
  defaultFormatParameters?: DefaultFormatParameters;
}

// TODO: create a merge function that merges specified options with the default set
const defaultOptions = ({
  level,
  silent,
  format,
  defaultFormatParameters,
}: DefaultOptionsParameters = {}): BrowserConsoleOptions<Level> => ({
  level,
  silent,
  format: format || defaultFormat(defaultFormatParameters),
  functions,
})

export default defaultOptions
