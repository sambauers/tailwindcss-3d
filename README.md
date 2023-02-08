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

#### scale and scale3d (x, y, z)

Inherits values from `theme.scale` in your config - default values are the same as the [core scale plugin](https://tailwindcss.com/docs/scale)

Scaling in one dimension:

```html
<!-- scale on x-axis 50% -->
<div class="scale-x-50">

<!-- scale on y-axis 75% -->
<div class="scale-y-75">

<!-- scale on z-axis 110% -->
<div class="scale-y-110">
```

You can mix scaling values together as well:

```html
<!-- scale on y-axis 75% and z-axis 95% -->
<div class="scale-y-75 scale-z-95"></div>
```

Arbitrary values:

```html
<!-- scale on y-axis 30% -->
<div class="scale-y-[0.3]"></div>

```

Scale on both x and y-axis in proportion:

```html
<!-- scale on x-axis and y-axis 50% -->
<div class="scale-50">
```

Scale all three dimensions in proportion:

```html
<!-- scale on x-axis, y-axis and z-axis 150% -->
<div class="scale3d-150">
```

#### rotate (x, y, z)

Inherits values from `theme.rotate` in your config - default values are the same as the [core rotate plugin](https://tailwindcss.com/docs/rotate)

Rotating around x-axis and y-axis:

```html
<!-- rotate along x-axis 45 degrees -->
<div class="rotate-x-45"></div>

<!-- rotate along y-axis 12 degrees -->
<div class="rotate-y-12"></div>
```

Z-axis rotation is still the default, so the following are equivalent to each other:

```html
<!-- rotate along z-axis 45 degrees -->
<div class="rotate-45"></div>

<!-- rotate along z-axis 45 degrees -->
<div class="rotate-z-45"></div>
```

Arbitrary values:

```html
<!-- rotate along y-axis 30 degrees -->
<div class="rotate-y-[30deg]"></div>
```

You can mix rotation values together as well:

```html
<!-- rotate along y-axis 12 degrees and z-axis 45 degrees -->
<div class="rotate-y-12 rotate-z-45"></div>
```

#### translate (x, y, z)
#### skew (x, y)
#### perspective
#### perspective-origin
#### backface
#### transform-box
#### transform-style

### Animations

Available animations:

#### bounce (x, y, z)
#### spin (x, y, z)
#### bounce-and-spin (x, y, z)

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
