# CSS-in-JS Performance Tests

Testing a couple of CSS-in-JS libraries, check [the source folder](./src/) for the different tests.

And read why we did these tests in the [CSS-in-JS Battle](https://engineering.hellofresh.com/the-css-in-js-battle-89c34a7a83ea) article.

## Usage

You can clone this repository, `npm install` and run `npm run bench` to run the tests yourself.

To set the amount of iterations (see below) you can set an environment variable called `ITERATIONS`. This will result in: `ITERATIONS=100 npm run bench`.

> Make sure you have Node6 or higher installed as well.

### Rendering tests

For results on how each case renders on the browser, 

1. [download Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and start it
2. Run `npm run compile`
3. Run `ITERATIONS=5000 npm run browserBench`

## Specs

The specs from the machine on which the tests were run:

```
$ node -v
v6.3.0

$ /usr/sbin/system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Model Identifier: MacBookPro12,1
      Processor Name: Intel Core i7
      Processor Speed: 3,1 GHz
      Number of Processors: 1
      Total Number of Cores: 2
      L2 Cache (per Core): 256 KB
      L3 Cache: 4 MB
      Memory: 16 GB
```

## Results

The first test is just a simple render test, generates two classes, one for a container and one for a button.

```
Running simple test.

  aphrodite               582 B  (291 B gzipped)
  aphrodite-no-important  472 B  (284 B gzipped)
  cssobj                  636 B  (321 B gzipped)
  cxs                     552 B  (304 B gzipped)
  cxs-optimized           634 B  (327 B gzipped)
  fela                    500 B  (292 B gzipped)
  free-style              521 B  (296 B gzipped)
  glamor                  591 B  (314 B gzipped)
  j2c                     743 B  (336 B gzipped)
  jss                     636 B  (333 B gzipped)
  jss-without-preset      731 B  (384 B gzipped)
  styletron               598 B  (359 B gzipped)

  Smallest is:          aphrodite-no-important
  Smallest gzipped are: aphrodite-no-important, aphrodite, fela, free-style


  aphrodite              x  5,648 ops/sec ±10.14% (68 runs sampled)
  aphrodite-no-important x  5,715 ops/sec ±7.75% (63 runs sampled)
  cssobj                 x  2,829 ops/sec ±7.19% (57 runs sampled)
  cxs                    x  8,801 ops/sec ±16.29% (58 runs sampled)
  cxs-optimized          x  9,571 ops/sec ±2.80% (79 runs sampled)
  fela                   x 36,836 ops/sec ±4.28% (68 runs sampled)
  free-style             x 12,795 ops/sec ±7.54% (76 runs sampled)
  glamor                 x  3,692 ops/sec ±7.35% (66 runs sampled)
  j2c                    x 17,029 ops/sec ±8.53% (64 runs sampled)
  jss                    x 80,601 ops/sec ±3.65% (71 runs sampled)
  jss-without-preset     x 95,168 ops/sec ±1.86% (79 runs sampled)
  styletron              x 84,297 ops/sec ±1.96% (86 runs sampled)

  Fastest is: jss-without-preset
```

The second test overloads on styles, so it adds `n (ITERATIONS)` amount of different styles with a common part for the buttons. Show which libraries can detect the common part and isolate it.

```
Running style overload test.

  aphrodite               3,537 B  (605 B gzipped)
  aphrodite-no-important  2,866 B  (592 B gzipped)
  cssobj                  3,207 B  (464 B gzipped)
  cxs                     2,757 B  (564 B gzipped)
  cxs-optimized           2,874 B  (579 B gzipped)
  fela                    1,528 B  (397 B gzipped)
  free-style              2,491 B  (525 B gzipped)
  glamor                  3,034 B  (607 B gzipped)
  j2c                     4,320 B  (497 B gzipped)
  jss                     3,318 B  (626 B gzipped)
  jss-without-preset      4,008 B  (835 B gzipped)
  styletron               2,301 B  (721 B gzipped)

  Smallest is:          fela
  Smallest gzipped is:  fela


  aphrodite              x    957 ops/sec ±11.66% (62 runs sampled)
  aphrodite-no-important x  1,042 ops/sec ±12.30% (66 runs sampled)
  cssobj                 x    634 ops/sec ±20.43% (58 runs sampled)
  cxs                    x  2,528 ops/sec ±1.72% (83 runs sampled)
  cxs-optimized          x  1,755 ops/sec ±7.35% (77 runs sampled)
  fela                   x  9,729 ops/sec ±12.10% (60 runs sampled)
  free-style             x  2,943 ops/sec ±3.97% (78 runs sampled)
  glamor                 x  1,092 ops/sec ±1.78% (83 runs sampled)
  j2c                    x  2,393 ops/sec ±26.37% (52 runs sampled)
  jss                    x 11,311 ops/sec ±6.37% (72 runs sampled)
  jss-without-preset     x 10,047 ops/sec ±8.77% (68 runs sampled)
  styletron              x  6,945 ops/sec ±10.64% (61 runs sampled)

  Fastest are: jss, jss-without-preset, fela
```

The third test overloads on classes, so it adds `n (ITERATIONS)` amount of different class names with the same styles. This test is interesting to see which library actually merges these styles when they're identical.

```
Running classes overload test.

  aphrodite               2,955 B  (406 B gzipped)
  aphrodite-no-important  2,504 B  (399 B gzipped)
  cssobj                  2,795 B  (394 B gzipped)
  cxs                     1,334 B  (283 B gzipped)
  cxs-optimized           1,713 B  (297 B gzipped)
  fela                    1,078 B  (259 B gzipped)
  free-style              1,173 B  (270 B gzipped)
  glamor                  1,283 B  (291 B gzipped)
  j2c                     4,034 B  (422 B gzipped)
  jss                     2,896 B  (402 B gzipped)
  jss-without-preset      3,582 B  (652 B gzipped)
  styletron               1,815 B  (565 B gzipped)

  Smallest is:          fela
  Smallest gzipped are: fela, free-style


  aphrodite              x    733 ops/sec ±14.99% (48 runs sampled)
  aphrodite-no-important x    905 ops/sec ±15.16% (49 runs sampled)
  cssobj                 x  1,060 ops/sec ±3.45% (78 runs sampled)
  cxs                    x  3,194 ops/sec ±4.36% (77 runs sampled)
  cxs-optimized          x  2,471 ops/sec ±3.88% (82 runs sampled)
  fela                   x 30,351 ops/sec ±3.35% (76 runs sampled)
  free-style             x  3,144 ops/sec ±7.63% (72 runs sampled)
  glamor                 x  3,854 ops/sec ±5.61% (74 runs sampled)
  j2c                    x  3,907 ops/sec ±4.66% (80 runs sampled)
  jss                    x 14,768 ops/sec ±3.92% (81 runs sampled)
  jss-without-preset     x  9,326 ops/sec ±14.76% (56 runs sampled)
  styletron              x 15,633 ops/sec ±9.51% (71 runs sampled)

  Fastest is: fela
```

The fourth test is about media queries and pseudo-styles with nested style objects.

```
Running nested test.

  aphrodite               1,179 B  (415 B gzipped)
  aphrodite-no-important    926 B  (399 B gzipped)
  cssobj                  1,111 B  (420 B gzipped)
  cxs                       975 B  (394 B gzipped)
  cxs-optimized           1,061 B  (419 B gzipped)
  fela                      800 B  (404 B gzipped)
  free-style                802 B  (370 B gzipped)
  glamor                  1,479 B  (452 B gzipped)
  j2c                     1,339 B  (427 B gzipped)
  jss                     1,089 B  (429 B gzipped)
  jss-without-preset        695 B  (351 B gzipped)
  styletron                 790 B  (409 B gzipped)

  Smallest is:          jss-without-preset
  Smallest gzipped is:  jss-without-preset


  aphrodite              x  3,822 ops/sec ±1.24% (77 runs sampled)
  aphrodite-no-important x  4,169 ops/sec ±1.84% (78 runs sampled)
  cssobj                 x  2,217 ops/sec ±1.90% (84 runs sampled)
  cxs                    x  7,515 ops/sec ±1.85% (86 runs sampled)
  cxs-optimized          x  6,374 ops/sec ±1.82% (85 runs sampled)
  fela                   x 19,657 ops/sec ±2.95% (82 runs sampled)
  free-style             x  7,357 ops/sec ±1.59% (81 runs sampled)
  glamor                 x  2,877 ops/sec ±1.98% (80 runs sampled)
  j2c                    x 14,118 ops/sec ±1.84% (86 runs sampled)
  jss                    x  3,537 ops/sec ±15.98% (69 runs sampled)
  jss-without-preset     x 13,334 ops/sec ±24.11% (58 runs sampled)
  styletron              x 32,644 ops/sec ±6.41% (75 runs sampled)

  Fastest is: styletron
```

### Bundle sizes

Launch with `npm run bundle`.

```
Size j2c 4.624KB
Size cssobj 10.375KB
Size cssobj-server 7.181KB
Size free-style 8.3KB
Size styletron 3.135KB
Size jss-without-preset 26.183KB
Size glamor 31.421KB
Size cxs 9.366KB
Size fela 13.161KB
Size cxs-optimized 12.268KB
Size jss 37.185KB
Size aphrodite 19.711KB
Size aphrodite-no-important 19.744KB
```

### View generated code

Launch with `npm run view`.

Find the generated HTML files with their embeded CSS for each test in the `output` directory.

Some observations:

For all of them, class name is stable between generations if same content. Unless said otherwise, the generated CSS is minimized.

#### aphrodite and aphrodite-no-important

(simple) Removes a non-used class. Generates class names like `original-name_1fm03kj`. By default, adds `!important` to each CSS property, *aphrodite-no-important* generates CSS without it.
(style overload) Different classes with a common style are kept as is.
(classes overload) Doesn't detect identical classes that remain duplicate.
(nested) Manages pseudo-classes and media queries.

#### cssobj

(simple) Doesn't remove a non-used class. Generates class names like `original-name_13otckp1_` (customizable suffix).
(style overload) Different classes with a common style are kept as is.
(classes overload) Doesn't detect identical classes that remain duplicate.
(nested) Manages pseudo-classes and media queries.

#### cxs and cxs-optimized

(simple) Doesn't remove a non-used class. Generates class names like `cxs-4211614354`.
(style overload) Different classes with a common style are kept as is.
(classes overload) Detects identical classes that are merged.
(nested) Manages pseudo-classes and media queries.

cxs-optimized can generate some specialized classes (with names like `cxs-display-block` or `cxs-text-align-center`) removed from the classes using these styles and added to elements using them. Seems limited to properties with a small number of possible values. Named colors are not deduplicated.

#### fela

(simple) Doesn't remove a non-used class. Generates class names like `a`, `b`, `c`. Each class has one property only, they are merged at element level.
(style overload) Styles common to several classes go to classes added to all corresponding elements.
(classes overload) Detects identical classes that are merged.
(nested) Manages pseudo-classes and media queries.

#### free-style

(simple) Doesn't remove a non-used class. Generates class names like `f1lzwo7y`.
(style overload) Different classes with a common style are kept as is.
(classes overload) Detects identical classes that are merged.
(nested) Manages pseudo-classes and media queries.

#### glamor

(simple) Doesn't remove a non-used class. Generates class names like `css-h433f4`. Add selectors like `[data-css-h433f4]`.
(style overload) Different classes with a common style are kept as is.
(classes overload) Detects identical classes that are merged.
(nested) Manages pseudo-classes and media queries. Adds selectors like `css-1u8v7v4[data-simulate-hover]`.

#### j2c

(simple) Doesn't remove a non-used class. Generates class names like `original-name_j2c_5atjj2_120pllj_lsbclb_1lwh5gt_0`. Class names change between generations. CSS is minified with newlines.
(style overload) Different classes with a common style are kept as is.
(classes overload) Doesn't detect identical classes that remain duplicate.
(nested) Manages pseudo-classes and media queries.

#### jss and jss-without-preset

(simple) Doesn't remove a non-used class. Generates class names like `original-name-3553477605`. CSS is formatted and indented (1 space).
(style overload) Different classes with a common style are kept as is.
(classes overload) Doesn't detect identical classes that remain duplicate.
(nested) Manages pseudo-classes and media queries.

#### styletron

(simple) Doesn't remove a non-used class. Generates class names like `a`, `b`, `c`. Each class has one property only, they are merged at element level (starts with a space).
(style overload) Styles common to several classes go to classes added to all corresponding elements.
(classes overload) Detects identical classes that are merged.
(nested) Manages pseudo-classes and media queries.


<p align="center">
  <a href="https://hellofresh.com">
    <img width="120" src="https://www.hellofresh.de/images/hellofresh/press/HelloFresh_Logo.png">
  </a>
</p>
