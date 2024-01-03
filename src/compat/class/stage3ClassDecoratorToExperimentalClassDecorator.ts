import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import type { AnyClass } from "../../types.js";
import { mockMetadata } from "../mockMetadata.js";

export const stage3ClassDecoratorToExperimentalClassDecorator =
    <BaseClass extends AnyClass = AnyClass>(
        stage3Decorator: stage3Decorators.ClassDecorator<BaseClass>,
    ): experimentalDecorators.ClassDecorator<BaseClass> =>
    <Class extends BaseClass>(target: Class): Class | void => {
        const mockContext: ClassDecoratorContext = {
            kind: "class",
            name: target.name,
            metadata: mockMetadata(target),
            addInitializer: (initializer) => {
                const originalConstructor = target.prototype.constructor;
                target.prototype.constructor = function (...args: any[]) {
                    originalConstructor.apply(this, args);
                    initializer.apply(this);
                };
            },
        };

        return stage3Decorator(target, mockContext) as void | Class;
    };
