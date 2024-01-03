import type { AnyMethod } from "../types.js";

/**
 * A `ClassMethodDecorator` is a function that augments a class method.
 *
 * It accepts a class method and a `ClassMethodDecoratorContext`.
 *
 * If it returns `void`, the method is left as-is except for changes made using the `ClassMethodDecoratorContext`.
 *
 * If it returns a new method, the method is replaced with the returned method. The returned method needs to be
 * compatible with the old one.
 *
 * @template BaseTarget The type of object this decorator can be applied to.
 * @template BaseValue The type of method this decorator can be applied to.
 */
export type ClassMethodDecorator<
    BaseTarget = unknown,
    BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>,
> = <Target extends BaseTarget, Value extends BaseValue & AnyMethod<Target>>(
    method: Value,
    context: ClassMethodDecoratorContext<Target, Value>,
) => void | Value;
