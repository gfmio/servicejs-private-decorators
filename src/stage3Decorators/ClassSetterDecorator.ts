/**
 * A `ClassSetterDecorator` is a function that augments a class Setter.
 *
 * It accepts a class setter function and a `ClassSetterDecoratorContext`.
 *
 * If it returns `void`, the setter is left as-is except for changes made using the `ClassSetterDecoratorContext`.
 *
 * If it returns a new setter function, the setter is replaced with the returned setter. The returned setter needs to be
 * compatible with the old one.
 *
 * @template BaseTarget The type of object this decorator can be applied to.
 * @template BaseValue The type of setter this decorator can be applied to.
 */

export type ClassSetterDecorator<BaseTarget = unknown, BaseValue = unknown> = <
    Target extends BaseTarget,
    Value extends BaseValue,
>(
    setter: (this: Target, value: Value) => void,
    context: ClassSetterDecoratorContext<Target, Value>,
) => void | ((this: Target, value: Value) => void);
