import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import { experimentalPropertyDecoratorToStage3FieldDecorator } from "./experimentalPropertyDecoratorToStage3FieldDecorator.js";
import { stage3FieldDecoratorToExperimentalPropertyDecorator } from "./stage3FieldDecoratorToExperimentalPropertyDecorator.js";

/**
 * A decorator for class fields / properties that can be used both when
 * experimental and when Stage 3 decorators are used in the project.
 *
 * @template BaseTarget The type of the class or object on which the decorator is applied.
 * @template BaseValue The type of the field or property value.
 */
export interface FieldDecorator<BaseTarget = unknown, BaseValue = unknown>
    extends stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue>,
        experimentalDecorators.PropertyDecorator<BaseTarget> {}

export namespace FieldDecorator {
    /**
     * Combines a stage 3 class field decorator and an experimental property
     * decorator into a single field decorator.
     *
     * @template BaseTarget The type of the class instance.
     * @template BaseValue The type of the class field value.
     * @param stage3Decorator The stage 3 class field decorator.
     * @param experimentalDecorator The experimental property decorator.
     * @returns The combined field decorator.
     */
    export const create = <BaseTarget = unknown, BaseValue = unknown>(
        stage3Decorator: stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue>,
        experimentalDecorator: experimentalDecorators.PropertyDecorator<BaseTarget>,
    ): FieldDecorator<BaseTarget, BaseValue> => {
        const decorator: FieldDecorator<BaseTarget, BaseValue> = (
            ...[arg1, arg2]:
                | Parameters<stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue>>
                | Parameters<experimentalDecorators.PropertyDecorator<BaseTarget>>
        ) => (arg1 === undefined ? stage3Decorator(arg1, arg2) : experimentalDecorator(arg1, arg2));

        return decorator;
    };

    /**
     * A higher-order function that takes an experimental property decorator and
     * transforms it into a field / property decorator compatible with both modes.
     *
     * @param experimentalDecorator - The experimental property decorator.
     * @returns The combined decorator.
     */
    export const fromExperimentalDecorator = <BaseTarget = unknown, BaseValue = unknown>(
        experimentalDecorator: experimentalDecorators.PropertyDecorator<BaseTarget>,
    ): FieldDecorator<BaseTarget, BaseValue> =>
        create<BaseTarget, BaseValue>(
            experimentalPropertyDecoratorToStage3FieldDecorator(experimentalDecorator),
            experimentalDecorator,
        );

    /**
     * A higher-order function that takes a Stage 3 field decorator and
     * transforms it into a field / property decorator compatible with both modes.
     *
     * @param stage3Decorator - The Stage 3 field decorator.
     * @returns The combined decorator.
     */
    export const fromStage3Decorator = <BaseTarget = unknown, BaseValue = unknown>(
        stage3Decorator: stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue>,
    ): FieldDecorator<BaseTarget, BaseValue> =>
        create(stage3Decorator, stage3FieldDecoratorToExperimentalPropertyDecorator(stage3Decorator));
}
