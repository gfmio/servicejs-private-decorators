/**
 * A `ClassFieldDecorator` is a function that augments a class field.
 *
 * It accepts undefined and a `ClassFieldDecoratorContext`.
 *
 * If it returns `void`, the field is left as-is except for changes made using the `ClassFieldDecoratorContext`.
 *
 * If it returns a new function accepting the initial value of the field and returning a new value, the initial value of
 * the field is replaced with the returned value. The returned value needs to be compatible with the old one.
 *
 * @template BaseTarget The type of object this decorator can be applied to.
 * @template BaseValue The type of field this decorator can be applied to.
 */
export type ClassFieldDecorator<BaseTarget = unknown, BaseValue = unknown> = <
    Target extends BaseTarget,
    Value extends BaseValue,
>(
    _: undefined,
    context: ClassFieldDecoratorContext<Target, Value>,
) => void | ((this: Target, value: Value) => Value);
