declare module "fela-plugin-fallback-value" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela" {
  interface IStyleExtension extends CSSPropertiesFallback {}

  interface IStylePrimitiveExtension {
    _string_array: string[];
    _number_array: number[];
  }  
}
