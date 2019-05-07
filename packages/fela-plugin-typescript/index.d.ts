declare module "fela-plugin-typescript" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela" {
  import * as CSS from "csstype";

  export interface IStyle extends CSS.Properties<string | number> {
    nested?: INestedSelectors;
  }

  export interface INestedSelectors {
    /** State selector */
    ':active'?: IStyle;
    ':any'?: IStyle;
    ':checked'?: IStyle;
    ':default'?: IStyle;
    ':disabled'?: IStyle;
    ':empty'?: IStyle;
    ':enabled'?: IStyle;
    ':first'?: IStyle;
    ':first-child'?: IStyle;
    ':first-of-type'?: IStyle;
    ':fullscreen'?: IStyle;
    ':focus'?: IStyle;
    ':hover'?: IStyle;
    ':indeterminate'?: IStyle;
    ':in-range'?: IStyle;
    ':invalid'?: IStyle;
    ':last-child'?: IStyle;
    ':last-of-type'?: IStyle;
    ':left'?: IStyle;
    ':link'?: IStyle;
    ':only-child'?: IStyle;
    ':only-of-type'?: IStyle;
    ':optional'?: IStyle;
    ':out-of-range'?: IStyle;
    ':read-only'?: IStyle;
    ':read-write'?: IStyle;
    ':required'?: IStyle;
    ':right'?: IStyle;
    ':root'?: IStyle;
    ':scope'?: IStyle;
    ':target'?: IStyle;
    ':valid'?: IStyle;
    ':visited'?: IStyle;

    /**
     * Pseudo-elements
     * https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements
     */
    '::after'?: IStyle;
    '::before'?: IStyle;
    '::first-letter'?: IStyle;
    '::first-line'?: IStyle;
    '::selection'?: IStyle;
    '::backdrop'?: IStyle;
    '::placeholder'?: IStyle;
    '::marker'?: IStyle;
    '::spelling-error'?: IStyle;
    '::grammar-error'?: IStyle;

    /** Children */
    '> *'?: IStyle;

    /**
     * Mobile first media query example
     **/
    '@media screen and (min-width: 700px)'?: IStyle;
    /**
     * Desktop first media query example
     **/
    '@media screen and (max-width: 700px)'?: IStyle;

    /**
     * Also cater for any other nested query you want
     */
    [selector: string]: IStyle | undefined;
  }
}