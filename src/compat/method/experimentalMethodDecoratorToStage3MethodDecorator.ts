import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import { AnyMethod } from "../../types.js";

export const experimentalMethodDecoratorToStage3MethodDecorator =
    <BaseTarget = unknown, BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>>(
        experimentalDecorator: experimentalDecorators.MethodDecorator<BaseTarget, BaseValue>,
    ): stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue> =>
    <Target extends BaseTarget, Value extends BaseValue & AnyMethod<Target>>(
        _target: Value,
        context: ClassMethodDecoratorContext<Target, Value>,
    ) => {
        context.addInitializer(function (this: Target) {
            const descriptor: TypedPropertyDescriptor<Value> = Object.getOwnPropertyDescriptor(this, context.name) ?? {
                configurable: true,
                enumerable: true,
                writable: true,
                value: context.access.get(this),
                get: () => context.access.get(this),
                set: (value) => {
                    this[context.name as keyof Target] = value as any;
                },
            };

            const result = experimentalDecorator(this, context.name, descriptor);

            if (result) {
                Object.defineProperty(this, context.name, result);
            }
        });
    };
