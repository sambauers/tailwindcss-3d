# TailwindCSS 3D

[![Test (Jest)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/test-jest.yml/badge.svg)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/test-jest.yml)
[![Lint (ESLInt)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/lint-eslint.yml/badge.svg)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/lint-eslint.yml)

Add 3D transforms to your TailwindCSS project.

## Description

TailwindCSS 3D is a TailwindCSS plugin that adds additional transform utilities
and animations which can help you to add three dimensional styling.

By default TailwindCSS adds transforms in two dimensions ("x" and "y" axis
only), so scale, rotate, and translate are flat transformations. This plugin
adds support for the "z" axis and implements extensions to the bounce and spin
animations to allow them to operate in multiple directions.

Tailwind's core implementation uses the
[`transform` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
to achieve all transformations. This method is better supported by older
browsers, but has some limitations which make it more difficult to use.

This plugin implements transformation using newer CSS properties like
[`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate),
[`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/translate),
and [`scale`](https://developer.mozilla.org/en-US/docs/Web/CSS/scale)
where support in more recent browsers allows. This opens some new possibilities
when combining utility classes with animations, and in the composition of new
animations.

## Installation

Install the plugin from npm:

```sh
npm install tailwindcss-3d
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-3d'),
    // ...
  ],
}
```

## Usage

### Utilities

Available utilities:

* scale (x, y, z)
* rotate (x, y, z)
* translate (x, y, z)
* skew (x, y)
* perspective
* perspective-origin
* backface
* transform-box
* transform-style

### Animations

Available animations:

* bounce (x, y, z)
* spin (x, y, z)
* bounce-and-spin (x, y, z)

## Configuration

Default modifiers and values for utilities and animations can be changed in your
`tailwind.config.js` file by extending the relevant theme defaults.

## Development

Requirements:

* NodeJS 18+
* PNPM 7+

### Build the plugin

After cloning the repository, to compile a build:

```sh
pnpm build
pnpm build:types
```

This will create a compiled version of the plugin in the `./dist` directory.

To have the build automatically compiled, run:

```sh
pnpm dev
```

This also compiles both code and types to `./dist`.

### Testing and linting

```sh
pnpm lint
pnpm test
```
