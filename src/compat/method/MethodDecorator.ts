import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import { AnyMethod } from "../../types.js";
import { experimentalMethodDecoratorToStage3MethodDecorator } from "./experimentalMethodDecoratorToStage3MethodDecorator.js";
import { stage3MethodDecoratorToExperimentalMethodDecorator } from "./stage3MethodDecoratorToExperimentalMethodDecorator.js";

/**
 * A decorator for class methods that can be used both when experimental and
 * when Stage 3 decorators are used in the project.
 *
 * @template BaseTarget The type of the class instance.
 * @template BaseValue The type of the method.
 */
export interface MethodDecorator<BaseTarget = unknown, BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>>
    extends stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue>,
        experimentalDecorators.MethodDecorator<BaseTarget, BaseValue> {}

export namespace MethodDecorator {
    /**
     * Combines a stage 3 decorator and an experimental decorator to create a method decorator.
     *
     * @template BaseTarget The type of the class instance.
     * @template BaseValue The type of the method.
     * @param stage3Decorator The stage 3 decorator function.
     * @param experimentalDecorator The experimental decorator function.
     * @returns A method decorator that applies either the stage 3 decorator or the experimental decorator based on the number of arguments passed.
     */
    export const create = <BaseTarget = unknown, BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>>(
        stage3Decorator: stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue>,
        experimentalDecorator: experimentalDecorators.MethodDecorator<BaseTarget, BaseValue>,
    ): MethodDecorator<BaseTarget, BaseValue> => {
        const decorator = (...args: any[]) =>
            args.length === 3
                ? experimentalDecorator(
                      ...(args as Parameters<experimentalDecorators.MethodDecorator<BaseTarget, BaseValue>>),
                  )
                : stage3Decorator(
                      ...(args as Parameters<stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue>>),
                  );

        return decorator as MethodDecorator<BaseTarget, BaseValue>;
    };

    /**
     * A higher-order function that takes an experimental method decorator and
     * transforms it into a method decorator compatible with both modes.
     *
     * @param experimentalDecorator - The experimental method decorator.
     * @returns The combined method decorator.
     */
    export const fromExperimentalDecorator = <
        BaseTarget = unknown,
        BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>,
    >(
        experimentalDecorator: experimentalDecorators.MethodDecorator<BaseTarget, BaseValue>,
    ): MethodDecorator<BaseTarget, BaseValue> =>
        create<BaseTarget, BaseValue>(
            experimentalMethodDecoratorToStage3MethodDecorator(experimentalDecorator),
            experimentalDecorator,
        );

    /**
     * A higher-order function that takes a Stage 3 method decorator and
     * transforms it into a method decorator compatible with both modes.
     *
     * @param stage3Decorator - The Stage 3 method decorator.
     * @returns The combined method decorator.
     */
    export const fromStage3Decorator = <
        BaseTarget = unknown,
        BaseValue extends AnyMethod<BaseTarget> = AnyMethod<BaseTarget>,
    >(
        stage3Decorator: stage3Decorators.ClassMethodDecorator<BaseTarget, BaseValue>,
    ): MethodDecorator<BaseTarget, BaseValue> =>
        create(stage3Decorator, stage3MethodDecoratorToExperimentalMethodDecorator(stage3Decorator));
}
