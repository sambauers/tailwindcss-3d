# 3D Plugin for Tailwind CSS

[![NPM package version](https://img.shields.io/npm/v/tailwindcss-3d?style=flat&logoColor=white&labelColor=gray&color=black&logo=npm&label=Package%20version)](https://www.npmjs.com/package/tailwindcss-3d)
[![Lint with ESLint](https://img.shields.io/github/actions/workflow/status/sambauers/tailwindcss-3d/lint-eslint.yml?style=flat&logoColor=white&labelColor=gray&color=black&logo=eslint&label=Lint)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/lint-eslint.yml)
[![Tests with Jest](https://img.shields.io/github/actions/workflow/status/sambauers/tailwindcss-3d/test-jest.yml?style=flat&logoColor=white&labelColor=gray&color=black&logo=jest&label=Tests)](https://github.com/sambauers/tailwindcss-3d/actions/workflows/test-jest.yml)
[![Test Coverage on Codecov](https://img.shields.io/codecov/c/github/sambauers/tailwindcss-3d?style=flat&logoColor=white&labelColor=gray&color=black&logo=codecov&label=Test%20coverage)](https://app.codecov.io/gh/sambauers/tailwindcss-3d)

Add 3D transforms to your TailwindCSS project.

## Description

3D Plugin for Tailwind CSS adds additional transform utilities and animations
which can help you to add three dimensional styling to your interface.

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

## Browser compatibility

Since this pluign uses newer CSS properties, it will produce CSS which is not
compatible with some older browsers.

Refer to [this list of CSS features on CanIUse.com](https://caniuse.com/?feats=mdn-css_properties_rotate,mdn-css_properties_scale,mdn-css_properties_translate,mdn-css_properties_perspective,mdn-css_properties_perspective-origin,mdn-css_properties_backface-visibility,mdn-css_properties_transform-box,mdn-css_properties_transform-style,transforms2d,transforms3d)

If you want to support older browsers, you can use `legacy` mode.

## Installation

Install the plugin using npm or your preferred package manager:

```sh
# npm
npm install -D tailwindcss-3d

# yarn
yarn add -D tailwindcss-3d

# pnpm
pnpm add -D tailwindcss-3d
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

Turn on `legacy` mode to support older browsers like this:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-3d')({ legacy: true }),
    // ...
  ],
}
```

All configuration of utility values is done via theme configuration in your
`tailwind.config.js` file.

Appropriate theme configuration points are indicated under each utility below.

Here is an example of extending the available rotation values to add a 30 degree
and a 60 degree rotation value on all axes:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      rotate: {
        '30': '30deg',
        '60': '60deg',
      },
    },
    // ...
  },
  plugins: [
    require('tailwindcss-3d'),
    // ...
  ],
}
```

For more information about extending your theme, see the relevant
[Tailwind documentation](https://tailwindcss.com/docs/theme#customizing-the-default-theme).

## Usage

### A note on coordinates

"y" axis values in the CSS coordinate system can be a bit confusing at first.
The origin of the coordinate system, where `x = 0, y = 0` in two-dimensional
space is the top-left of the browser window. From there, positive values of "x"
are to the right as expected, but positive values of "y" are in the downward
direction from that point. This is the opposite of common usage in other
contexts like maths and construction.

The effect of this is felt most when translating elements which are in the
middle of a page, and also in the case of this plugin when applying directions
to animations.

### Utilities

#### scale

[Tailwind Play scale utility examples](https://play.tailwindcss.com/IzMFd64IOn)

| Class.      | Properties            |
| ----------- | --------------------- |
| scale-x-0   | scale: 0 … …          |
| scale-y-0   | scale: … 0 …          |
| scale-z-0   | scale: … … 0          |
| scale-0     | scale: 0 0 …          |
| scale3d-0   | scale: 0 0 0          |
| scale-x-50  | scale: .5 … …         |
| scale-y-50  | scale: … .5 …         |
| scale-z-50  | scale: … … .5         |
| scale-50    | scale: .5 .5 …        |
| scale3d-50  | scale: .5 .5 .5       |
| scale-x-75  | scale: .75 … …        |
| scale-y-75  | scale: … .75 …        |
| scale-z-75  | scale: … … .75        |
| scale-75    | scale: .75 .75 …      |
| scale3d-75  | scale: .75 .75 .75    |
| scale-x-90  | scale: .9 … …         |
| scale-y-90  | scale: … .9 …         |
| scale-z-90  | scale: … … .9         |
| scale-90    | scale: .9 .9 …        |
| scale3d-90  | scale: .9 .9 .9       |
| scale-x-95  | scale: .95 … …        |
| scale-y-95  | scale: … .95 …        |
| scale-z-95  | scale: … … .95        |
| scale-95    | scale: .95 .95 …      |
| scale3d-95  | scale: .95 .95 .95    |
| scale-x-100 | scale: 1 … …          |
| scale-y-100 | scale: … 1 …          |
| scale-z-100 | scale: … … 1          |
| scale-100   | scale: 1 1 …          |
| scale3d-100 | scale: 1 1 1          |
| scale-x-105 | scale: 1.05 … …       |
| scale-y-105 | scale: … 1.05 …       |
| scale-z-105 | scale: … … 1.05       |
| scale-105   | scale: 1.05 1.05 …    |
| scale3d-105 | scale: 1.05 1.05 1.05 |
| scale-x-110 | scale: 1.1 … …        |
| scale-y-110 | scale: … 1.1 …        |
| scale-z-110 | scale: … … 1.1        |
| scale-110   | scale: 1.1 1.1 …      |
| scale3d-110 | scale: 1.1 1.1 1.1    |
| scale-x-125 | scale: 1.25 … …       |
| scale-y-125 | scale: … 1.25 …       |
| scale-z-125 | scale: … … 1.25       |
| scale-125   | scale: 1.25 1.25 …    |
| scale3d-125 | scale: 1.25 1.25 1.25 |
| scale-x-150 | scale: 1.5 … …        |
| scale-y-150 | scale: … 1.5 …        |
| scale-z-150 | scale: … … 1.5        |
| scale-150   | scale: 1.5 1.5 …      |
| scale3d-150 | scale: 1.5 1.5 1.5    |

Inherits values from `theme.scale` in your config.

Scaling in one dimension:

```html
<!-- scale on x-axis 50% -->
<div class="scale-x-50">

<!-- scale on y-axis 75% -->
<div class="scale-y-75">

<!-- scale on z-axis 110% -->
<div class="scale-z-110">
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

#### rotate

[Tailwind Play rotate utility examples](https://play.tailwindcss.com/m1NO5HFfGx)

| Class        | Properties                  |
| ------------ | --------------------------- |
| rotate-x-0   | transform: rotateX(0deg);   |
| rotate-y-0   | transform: rotateY(0deg);   |
| rotate-z-0   | rotate: 0deg;               |
| rotate-0     | rotate: 0deg;               |
| rotate-x-1   | transform: rotateX(1deg);   |
| rotate-y-1   | transform: rotateY(1deg);   |
| rotate-z-1   | rotate: 1deg;               |
| rotate-1     | rotate: 1deg;               |
| rotate-x-2   | transform: rotateX(2deg);   |
| rotate-y-2   | transform: rotateY(2deg);   |
| rotate-z-2   | rotate: 2deg;               |
| rotate-2     | rotate: 2deg;               |
| rotate-x-3   | transform: rotateX(3deg);   |
| rotate-y-3   | transform: rotateY(3deg);   |
| rotate-z-3   | rotate: 3deg;               |
| rotate-3     | rotate: 3deg;               |
| rotate-x-6   | transform: rotateX(6deg);   |
| rotate-y-6   | transform: rotateY(6deg);   |
| rotate-z-6   | rotate: 6deg;               |
| rotate-6     | rotate: 6deg;               |
| rotate-x-12  | transform: rotateX(12deg);  |
| rotate-y-12  | transform: rotateY(12deg);  |
| rotate-z-12  | rotate: 12deg;              |
| rotate-12    | rotate: 12deg;              |
| rotate-x-45  | transform: rotateX(45deg);  |
| rotate-y-45  | transform: rotateY(45deg);  |
| rotate-z-45  | rotate: 45deg;              |
| rotate-45    | rotate: 45deg;              |
| rotate-x-90  | transform: rotateX(90deg);  |
| rotate-y-90  | transform: rotateY(90deg);  |
| rotate-z-90  | rotate: 90deg;              |
| rotate-90    | rotate: 90deg;              |
| rotate-x-180 | transform: rotateX(180deg); |
| rotate-y-180 | transform: rotateY(180deg); |
| rotate-z-180 | rotate: 180deg;             |
| rotate-180   | rotate: 180deg;             |

Inherits values from `theme.rotate` in your config.

Rotating around x-axis and y-axis:

```html
<!-- rotate along x-axis 45 degrees -->
<div class="rotate-x-45"></div>

<!-- rotate along y-axis 12 degrees -->
<div class="rotate-y-12"></div>
```

Z-axis rotation is still the default, so the following are equivalent to each
other:

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

#### translate

[Tailwind Play translate utility examples](https://play.tailwindcss.com/5O5nybIKRJ)

| Class            | Properties                 |
| ---------------- | -------------------------- |
| translate-x-0    | translate: 0px … …;        |
| translate-y-0    | translate: … 0px …;        |
| translate-z-0    | translate: … … 0px;        |
| translate-x-px   | translate: 1px … …;        |
| translate-y-px   | translate: … 1px …;        |
| translate-z-px   | translate: … … 1px;        |
| translate-x-0.5  | translate: 0.125rem … …;   |
| translate-y-0.5  | translate: … 0.125rem …;   |
| translate-z-0.5  | translate: … … 0.125rem;   |
| translate-x-1    | translate: 0.25rem … …;    |
| translate-y-1    | translate: … 0.25rem …;    |
| translate-z-1    | translate: … … 0.25rem;    |
| translate-x-1.5  | translate: 0.375rem … …;   |
| translate-y-1.5  | translate: … 0.375rem …;   |
| translate-z-1.5  | translate: … … 0.375rem;   |
| translate-x-2    | translate: 0.5rem … …;     |
| translate-y-2    | translate: … 0.5rem …;     |
| translate-z-2    | translate: … … 0.5rem;     |
| translate-x-2.5  | translate: 0.625rem … …;   |
| translate-y-2.5  | translate: … 0.625rem …;   |
| translate-z-2.5  | translate: … … 0.625rem;   |
| translate-x-3    | translate: 0.75rem … …;    |
| translate-y-3    | translate: … 0.75rem …;    |
| translate-z-3    | translate: … … 0.75rem;    |
| translate-x-3.5  | translate: 0.875rem … …;   |
| translate-y-3.5  | translate: … 0.875rem …;   |
| translate-z-3.5  | translate: … … 0.875rem;   |
| translate-x-4    | translate: 1rem … …;       |
| translate-y-4    | translate: … 1rem …;       |
| translate-z-4    | translate: … … 1rem;       |
| translate-x-5    | translate: 1.25rem … …;    |
| translate-y-5    | translate: … 1.25rem …;    |
| translate-z-5    | translate: … … 1.25rem;    |
| translate-x-6    | translate: 1.5rem … …;     |
| translate-y-6    | translate: … 1.5rem …;     |
| translate-z-6    | translate: … … 1.5rem;     |
| translate-x-7    | translate: 1.75rem … …;    |
| translate-y-7    | translate: … 1.75rem …;    |
| translate-z-7    | translate: … … 1.75rem;    |
| translate-x-8    | translate: 2rem … …;       |
| translate-y-8    | translate: … 2rem …;       |
| translate-z-8    | translate: … … 2rem;       |
| translate-x-9    | translate: 2.25rem … …;    |
| translate-y-9    | translate: … 2.25rem …;    |
| translate-z-9    | translate: … … 2.25rem;    |
| translate-x-10   | translate: 2.5rem … …;     |
| translate-y-10   | translate: … 2.5rem …;     |
| translate-z-10   | translate: … … 2.5rem;     |
| translate-x-11   | translate: 2.75rem … …;    |
| translate-y-11   | translate: … 2.75rem …;    |
| translate-z-11   | translate: … … 2.75rem;    |
| translate-x-12   | translate: 3rem … …;       |
| translate-y-12   | translate: … 3rem …;       |
| translate-z-12   | translate: … … 3rem;       |
| translate-x-14   | translate: 3.5rem … …;     |
| translate-y-14   | translate: … 3.5rem …;     |
| translate-z-14   | translate: … … 3.5rem;     |
| translate-x-16   | translate: 4rem … …;       |
| translate-y-16   | translate: … 4rem …;       |
| translate-z-16   | translate: … … 4rem;       |
| translate-x-20   | translate: 5rem … …;       |
| translate-y-20   | translate: … 5rem …;       |
| translate-z-20   | translate: … … 5rem;       |
| translate-x-24   | translate: 6rem … …;       |
| translate-y-24   | translate: … 6rem …;       |
| translate-z-24   | translate: … … 6rem;       |
| translate-x-28   | translate: 7rem … …;       |
| translate-y-28   | translate: … 7rem …;       |
| translate-z-28   | translate: … … 7rem;       |
| translate-x-32   | translate: 8rem … …;       |
| translate-y-32   | translate: … 8rem …;       |
| translate-z-32   | translate: … … 8rem;       |
| translate-x-36   | translate: 9rem … …;       |
| translate-y-36   | translate: … 9rem …;       |
| translate-z-36   | translate: … … 9rem;       |
| translate-x-40   | translate: 10rem … …;      |
| translate-y-40   | translate: … 10rem …;      |
| translate-z-40   | translate: … … 10rem;      |
| translate-x-44   | translate: 11rem … …;      |
| translate-y-44   | translate: … 11rem …;      |
| translate-z-44   | translate: … … 11rem;      |
| translate-x-48   | translate: 12rem … …;      |
| translate-y-48   | translate: … 12rem …;      |
| translate-z-48   | translate: … … 12rem;      |
| translate-x-52   | translate: 13rem … …;      |
| translate-y-52   | translate: … 13rem …;      |
| translate-z-52   | translate: … … 13rem;      |
| translate-x-56   | translate: 14rem … …;      |
| translate-y-56   | translate: … 14rem …;      |
| translate-z-56   | translate: … … 14rem;      |
| translate-x-60   | translate: 15rem … …;      |
| translate-y-60   | translate: … 15rem …;      |
| translate-z-60   | translate: … … 15rem;      |
| translate-x-64   | translate: 16rem … …;      |
| translate-y-64   | translate: … 16rem …;      |
| translate-z-64   | translate: … … 16rem;      |
| translate-x-72   | translate: 18rem … …;      |
| translate-y-72   | translate: … 18rem …;      |
| translate-z-72   | translate: … … 18rem;      |
| translate-x-80   | translate: 20rem … …;      |
| translate-y-80   | translate: … 20rem …;      |
| translate-z-80   | translate: … … 20rem;      |
| translate-x-96   | translate: 24rem … …;      |
| translate-y-96   | translate: … 24rem …;      |
| translate-z-96   | translate: … … 24rem;      |
| translate-x-1/2  | translate: 50% … …;        |
| translate-y-1/2  | translate: … 50% …;        |
| translate-x-1/3  | translate: 33.333333% … …; |
| translate-y-1/3  | translate: … 33.333333% …; |
| translate-x-2/3  | translate: 66.666667% … …; |
| translate-y-2/3  | translate: … 66.666667% …; |
| translate-x-1/4  | translate: 25% … …;        |
| translate-y-1/4  | translate: … 25% …;        |
| translate-x-2/4  | translate: 50% … …;        |
| translate-y-2/4  | translate: … 50% …;        |
| translate-x-3/4  | translate: 75% … …;        |
| translate-y-3/4  | translate: … 75% …;        |
| translate-x-full | translate: 100% … …;       |
| translate-y-full | translate: … 100% …;       |

Inherits values from `theme.translate` in your config.

Note that translation on the z-axis can not use percentage values.

#### skew

| Class     | Properties               |
| --------- | ------------------------ |
| skew-x-0  | transform: skewX(0deg);  |
| skew-y-0  | transform: skewY(0deg);  |
| skew-x-1  | transform: skewX(1deg);  |
| skew-y-1  | transform: skewY(1deg);  |
| skew-x-2  | transform: skewX(2deg);  |
| skew-y-2  | transform: skewY(2deg);  |
| skew-x-3  | transform: skewX(3deg);  |
| skew-y-3  | transform: skewY(3deg);  |
| skew-x-6  | transform: skewX(6deg);  |
| skew-y-6  | transform: skewY(6deg);  |
| skew-x-12 | transform: skewX(12deg); |
| skew-y-12 | transform: skewY(12deg); |

Inherits values from `theme.skew` in your config.

#### perspective

| Class            | Properties           |
| ---------------- | -------------------- |
| perspective-none | perspective: none;   |
| perspective-250  | perspective: 250px;  |
| perspective-500  | perspective: 500px;  |
| perspective-750  | perspective: 750px;  |
| perspective-1000 | perspective: 1000px; |

Inherits values from `theme.perspective` in your config.

#### perspective-origin

| Class                           | Properties                        |
| ------------------------------- | --------------------------------- |
| perspective-origin-center       | perspective-origin: center;       |
| perspective-origin-top          | perspective-origin: top;          |
| perspective-origin-top-right    | perspective-origin: top right;    |
| perspective-origin-right        | perspective-origin: right;        |
| perspective-origin-bottom-right | perspective-origin: bottom right; |
| perspective-origin-bottom       | perspective-origin: bottom;       |
| perspective-origin-bottom-left  | perspective-origin: bottom left;  |
| perspective-origin-left         | perspective-origin: left;         |
| perspective-origin-top-left     | perspective-origin: top left;     |

Inherits values from `theme.perspectiveOrigin` in your config.

#### backface

| Class            | Properties                    |
| ---------------- | ----------------------------- |
| backface-visible | backface-visibility: visible; |
| backface-hidden  | backface-visibility: hidden;  |

Inherits values from `theme.backface` in your config.

#### transform-box

| Class                 | Properties                 |
| --------------------- | -------------------------- |
| transform-box-content | transform-box: content-box |
| transform-box-border  | transform-box: border-box  |
| transform-box-fill    | transform-box: fill-box    |
| transform-box-stroke  | transform-box: stroke-box  |
| transform-box-view    | transform-box: view-box    |

Inherits values from `theme.transformBox` in your config.

#### transform-style

| Class                | Properties                   |
| -------------------- | ---------------------------- |
| transform-style-flat | transform-style: flat        |
| transform-style-3d   | transform-style: preserve-3d |

Inherits values from `theme.transformStyle` in your config.

### Animations

[Tailwind Play animation examples](https://play.tailwindcss.com/3eRYxPuBZX)

Available animations:

* bounce (x, y, z)
* spin (x, y, z)
* bounce-and-spin (x, y, z)

An example:

```html
<!-- spin around the y-axis at a medium rate -->
<div class="animate-spin-y-5"></div>
```

Note that you may see unexpected results on the y-axis as this plugin treats
"up" as a negative value. You can use negative animations (prepending a `-` to
the start of a class) to change the direction of travel:

```html
<!-- bounce upwards at a medium rate and height on the y-axis -->
<div class="-animate-bounce-y-5"></div>
```

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
