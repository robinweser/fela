/* TODO: Add all Interfaces and Methods */
interface Renderer {
    renderRule(rule: Function, props?: any): string
}

export declare function createRenderer(config?:any): Renderer;
export declare function combineRules(...rules:any[]): Function;
export declare function enhance(...enhancers:any[]): Function;
export declare function render(renderer:any, mountNode:HTMLElement): void;
