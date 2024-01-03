import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import { AnyMethod } from "../../types.js";
import { mockMetadata } from "../mockMetadata.js";

export const stage3MethodDecoratorToExperimentalMethodDecorator =
    <BaseTarget = unknown, BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>>(
        stage3Decorator: stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue>,
    ): experimentalDecorators.MethodDecorator<BaseTarget, BaseValue> =>
    <Target extends BaseTarget, Value extends BaseValue & AnyMethod<Target>>(
        target: Target,
        propertyKey: string | symbol,
        _descriptor: TypedPropertyDescriptor<Value>,
    ): TypedPropertyDescriptor<Value> | void => {
        const mockContext: ClassMethodDecoratorContext<Target, Value> = {
            kind: "method",
            name: propertyKey,
            private: propertyKey.toString().startsWith("#"),
            static: typeof target === "function",
            metadata: mockMetadata(target),
            access: {
                get: (object) => (object as Target)[propertyKey as keyof Target] as Value,
                has: (object) => propertyKey in (object as Target & object),
            },
            addInitializer: (initializer) => {
                initializer.apply(target);
            },
        };

        const result = stage3Decorator(target[propertyKey as keyof Target] as Value, mockContext);

        if (result) {
            Object.defineProperty(target, propertyKey, result);
        }
    };
