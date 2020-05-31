# Rules of Winston

## How the `info` Object Behaves

This describes the default behavior of [`info` objects](https://github.com/winstonjs/winston#streams-objectmode-and-info-objects) in Winston.

### 1. Simplest Scenario

Let's say you make a simple `logger.debug` call...

```ts
logger.debug("Hello world!");
```

The `info` object created by that call will look like this:

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":"Hello World!"}`
}
```

### 2. Appending Arguments

Let's say you append some strings and numbers and objects onto the `logger.debug` call.

```ts
logger.debug("Hello World!", 21, "test", { x: 342, y: 215 });
```

Then the `info` object created by the call will look like this:

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":"Hello World!"}`,
  Symbol(splat): [21, "test", {x: 342, y: 215}]
}
```

As you can see, the appended arguments appeared in the `info` object as an array assigned to the property `Symbol(splat)`.

### 3. Appending an Object Literal

If the first argument you append after the message string onto the `logger.debug` call is an object literal, the behavior is slightly different.

```ts
logger.debug("Hello World!", { x: 342, y: 215 }, 21, "test");
```

The object literal's properties are merged into the `info` object and also appear in the `Symbol(message)` property:

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  x: 342,
  y: 215,
  Symbol(level): "debug",
  Symbol(message): `{"x":342,"y":215,"level":"debug","message":"Hello World!"}`,
  Symbol(splat): [21, "test"]
}
```

Note that this is not the case if the first argument after the message string is an instance of a class:

```ts
logger.debug("Hello World!", new FileReader(), 21, "test");
```

...results in...

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":"Hello World!"}`,
  Symbol(splat): [FileReader, 21, "test"]
}
```

### 4. No message

If you don't provide a message string when calling `console.debug`, then whatever you supplied as the first argument will be assigned as the `message` property of the `info` object:

```ts
logger.debug(21, "test", { x: 342, y: 215 });
```

The `info` object:

```ts
const infoObject = {
  level: "debug",
  message: 21,
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":21}`,
  Symbol(splat): ["test", { x: 342, y: 215 }]
}
```

### 5. Calling a Log Function With One Object Literal Argument

```ts
logger.debug({ prop: "something", message: "Hello World!" });
```

Calling a log function with one single object literal argument that has a `message` property, merges that object literal with the `info` object, as following:

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  prop: "something",
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":"Hello World","prop":"something"}`
}
```

The same is also true for the following scenario:

```ts
logger.debug("Hello", { message: " World!" });
```

The `info` object:

```ts
const infoObject = {
  level: "debug",
  message: "Hello World!",
  Symbol(level): "debug",
  Symbol(message): `{"level":"debug","message":"Hello World"}`
}
```

## Formats

A list of miscellaneous things regarding [formats](https://github.com/winstonjs/winston#formats).

- The [`errors` format](https://github.com/winstonjs/logform#errors) is only available in a server-side (Node.js) environment.
