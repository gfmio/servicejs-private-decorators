/**
 * A `ClassGetterDecorator` is a function that augments a class getter.
 *
 * It accepts a class getter function and a `ClassGetterDecoratorContext`.
 *
 * If it returns `void`, the getter is left as-is except for changes made using the `ClassGetterDecoratorContext`.
 *
 * If it returns a new getter function, the getter is replaced with the returned getter. The returned getter needs to be
 * compatible with the old one.
 *
 * @template BaseTarget The type of object this decorator can be applied to.
 * @template BaseValue The type of getter this decorator can be applied to.
 */

export type ClassGetterDecorator<BaseTarget = unknown, BaseValue = unknown> = <
    Target extends BaseTarget,
    Value extends BaseValue,
>(
    getter: (this: Target) => Value,
    context: ClassGetterDecoratorContext<Target, Value>,
) => void | ((this: Target) => Value);
