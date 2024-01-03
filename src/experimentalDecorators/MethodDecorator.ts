import { AnyMethod } from "../types.js";
import type { _MethodDecorator } from "./types.js";

// type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

/**
 * An experimental method decorator.
 *
 * @template BaseTarget The base type of the decorated method's target.
 * @template BaseValue The base type of the decorated method.
 */
export interface MethodDecorator<BaseTarget = unknown, BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>>
    extends _MethodDecorator {
    /**
     * Decorates a method.
     *
     * @template Target The type of the decorator target.
     * @template Value The type of the decorated method.
     * @param target The target object or constructor function.
     * @param propertyKey The name of the method being decorated.
     * @param descriptor The property descriptor of the method being decorated.
     * @returns The modified property descriptor or void.
     */
    <Target extends BaseTarget, Value extends BaseValue & AnyMethod<Target>>(
        target: Target,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<Value>,
    ): TypedPropertyDescriptor<Value> | void;
}
