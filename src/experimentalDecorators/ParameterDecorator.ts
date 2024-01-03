import type { _ParameterDecorator } from "./types.js";

// type ParameterDecorator = (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => void;

/**
 * An experimental parameter decorator.
 *
 * @template BaseTarget The base type of the decorator target.
 */
export interface ParameterDecorator<BaseTarget = unknown> extends _ParameterDecorator {
    /**
     * A function that serves as the decorator.
     *
     * @template Target The type of the decorator target.
     * @param target The decorator target.
     * @param propertyKey The property key associated with the parameter.
     * @param parameterIndex The index of the parameter.
     */
    <Target extends BaseTarget>(target: Target, propertyKey: string | symbol | undefined, parameterIndex: number): void;
}
