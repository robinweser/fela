declare module "fela-plugin-fallback-value" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela" {
  import * as CSS from 'csstype';

  type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;
  interface IStyleExtension extends CSSPropertiesFallback {}
}