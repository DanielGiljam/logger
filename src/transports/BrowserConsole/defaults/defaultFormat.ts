import {Format, format} from "logform"

import browserConsoleFormat, {Options, Part} from "../format"
import {Level} from "../levels"

import browserConsoleColors from "./defaultColors"
import defaultBrowserConsoleFormatOptions, {
  DefaultFormatOptionsParameters,
} from "./defaultFormatOptions"

export interface DefaultFormatParameters {
  label?: string;
  timestampFormat?: string;
  browserConsoleFormatOptions?: Options<Level, Part>;
  colors?: DefaultFormatOptionsParameters["colors"];
}

const defaultFormat = ({
  label,
  timestampFormat,
  browserConsoleFormatOptions,
  colors,
}: DefaultFormatParameters = {}): Format =>
  format.combine(
    format.label({label}),
    format.timestamp({
      format: timestampFormat || "THH:MM:ss.SSS",
      alias: "time",
    }),
    browserConsoleFormat(
      browserConsoleFormatOptions ||
        defaultBrowserConsoleFormatOptions({
          colors: colors || browserConsoleColors,
        }),
    ),
  )

export default defaultFormat
