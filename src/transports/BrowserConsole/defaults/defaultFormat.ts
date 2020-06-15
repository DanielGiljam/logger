import {Format, format} from "logform"

// TODO: figure out why Part is being imported from the browser console transport format logic module
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
  printLevel?: boolean;
  printTimestamp?: boolean;
}

const defaultFormat = ({
  label,
  timestampFormat,
  browserConsoleFormatOptions,
  colors,
  printLevel,
  printTimestamp,
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
          printLevel: typeof printLevel !== "undefined" ? printLevel : true,
          printTimestamp:
            typeof printTimestamp !== "undefined" ? printTimestamp : true,
        }),
    ),
  )

export default defaultFormat
