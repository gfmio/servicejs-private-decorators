import type { AnyClass } from "../types.js";

/**
 * A `ClassDecorator` is a function that augments a class.
 *
 * It accepts the class to be decorated and a `ClassDecoratorContext`.
 *
 * If it returns `void`, the class is left as-is except for changes made using the `ClassDecoratorContext`.
 *
 * If it returns a new class, the class is replaced with the returned class. The returned class needs to be compatible
 * with the old one.
 *
 * @template BaseClass The type of class this decorator can be applied to.
 */
export type ClassDecorator<BaseClass extends AnyClass = AnyClass> = <Class extends BaseClass>(
    cls: Class,
    context: ClassDecoratorContext<Class>,
) => void | Class;
