import type { _PropertyDecorator } from "./types.js";

// type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

/**
 * An experimental property decorator.
 *
 * @template BaseTarget The base type of the decorator target.
 */
export interface PropertyDecorator<BaseTarget = unknown> extends _PropertyDecorator {
    /**
     * Applies the decorator to a property.
     *
     * @template Target The type of the decorator target.
     * @param target The target object.
     * @param propertyKey The name of the property.
     */
    <Target extends BaseTarget>(target: Target, propertyKey: string | symbol): void;
}
