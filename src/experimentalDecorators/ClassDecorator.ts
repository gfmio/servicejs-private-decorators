import type { AnyClass } from "../types.js";
import type { _ClassDecorator } from "./types.js";

// type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

/**
 * An experimental class decorator.
 *
 * @template BaseClass The base class type that the decorator can be applied to.
 */
export interface ClassDecorator<BaseClass extends Function & AnyClass = AnyClass> extends _ClassDecorator {
    /**
     * Applies the decorator to the specified class.
     *
     * @template Class The type of the class that the decorator is being applied to.
     * @param target The class to apply the decorator to.
     * @returns The decorated class or void.
     */
    <Class extends BaseClass>(target: Class): Class | void;
}
