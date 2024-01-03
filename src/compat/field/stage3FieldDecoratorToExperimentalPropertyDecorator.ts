import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import { mockMetadata } from "../mockMetadata.js";

export const stage3FieldDecoratorToExperimentalPropertyDecorator =
    <BaseTarget = unknown, BaseValue = unknown>(
        stage3Decorator: stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue>,
    ): experimentalDecorators.PropertyDecorator<BaseTarget> =>
    <Target extends BaseTarget>(target: Target, propertyKey: string | symbol): void => {
        const mockContext: ClassFieldDecoratorContext<Target, BaseValue> = {
            kind: "field",
            name: propertyKey,
            private: propertyKey.toString().startsWith("#"),
            static: typeof target === "function",
            metadata: mockMetadata(target),
            access: {
                get: (object) => (object as Target)[propertyKey as keyof Target] as BaseValue,
                set: (object, value) => {
                    (object as Target)[propertyKey as keyof Target] = value as any;
                },
                has: (object) => propertyKey in (object as Target & object),
            },
            addInitializer: (initializer) => {
                initializer.apply(target);
            },
        };

        stage3Decorator(undefined, mockContext);
    };
