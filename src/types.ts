export type AnyClass = abstract new (...args: any) => any;

export type AnyMethod<This> = (this: This, ...args: any) => any;
