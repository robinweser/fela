declare function createRenderer (config: Object): Object;
declare function combineRules (...rules: Object[]): Function;
declare function enhance (...enhancers: Object[]): Function;
declare function render (renderer: Object, mountNode: Object): void;