/**
 * A `ClassAccessorDecorator` is a function that augments a class accessor.
 *
 * It accepts a `ClassAccessorDecoratorTarget` and a `ClassAccessorDecoratorContext`.
 *
 * If it returns `void`, the accessor is left as-is except for changes made using the `ClassAccessorDecoratorContext`.
 *
 * If it returns a `ClassAccessorDecoratorResult`, the accessor is replaced with the returned accessor. The returned
 * accessor needs to be compatible with the old one.
 *
 * @template BaseTarget The type of object this decorator can be applied to.
 * @template BaseValue The type of accessor this decorator can be applied to.
 */
export type ClassAccessorDecorator<BaseTarget = unknown, BaseValue = unknown> = <
    Target extends BaseTarget,
    Value extends BaseValue,
>(
    target: ClassAccessorDecoratorTarget<Target, Value>,
    context: ClassAccessorDecoratorContext<Target, Value>,
) => void | ClassAccessorDecoratorResult<Target, Value>;
