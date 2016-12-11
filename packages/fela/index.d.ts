export interface Renderer {
    clear(): void;
    renderRule(rule: Function, props?: any): string;
    renderKeyframe(keyframe: any, props?: any): string;
    renderFont(family: string, files: any[], properties?: any): string;
    renderStatic(style: string | any, selector?: string): string;
    renderToString(): string;
    subscribe(callback: Function): any;
}

export declare function createRenderer(config?:any): Renderer;
export declare function combineRules(...rules:any[]): Function;
export declare function enhance(...enhancers:any[]): Function;
