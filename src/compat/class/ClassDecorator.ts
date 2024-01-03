import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import type { AnyClass } from "../../types.js";
import { experimentalClassDecoratorToStage3ClassDecorator } from "./experimentalClassDecoratorToStage3ClassDecorator.js";
import { stage3ClassDecoratorToExperimentalClassDecorator } from "./stage3ClassDecoratorToExperimentalClassDecorator.js";

/**
 * A decorator that can be applied to a class that can be used both when
 * experimental and when Stage 3 decorators are used in the project.
 *
 * @template BaseClass - The base class type.
 */
export interface ClassDecorator<BaseClass extends Function & AnyClass = AnyClass>
    extends stage3Decorators.ClassDecorator<BaseClass>,
        experimentalDecorators.ClassDecorator<BaseClass> {}

export namespace ClassDecorator {
    /**
     * A higher-order function that combines a Stage 3 class decorator and an
     * experimental class decorator into a class decorator compatible with both
     * modes.
     *
     * @param stage3Decorator - The Stage 3 class decorator.
     * @param experimentalDecorator - The experimental class decorator.
     * @returns The combined class decorator.
     */
    export const create = <BaseClass extends Function & AnyClass = AnyClass>(
        stage3Decorator: stage3Decorators.ClassDecorator<BaseClass>,
        experimentalDecorator: experimentalDecorators.ClassDecorator<BaseClass>,
    ): ClassDecorator<BaseClass> => {
        const decorator: ClassDecorator<BaseClass> = (
            target: BaseClass,
            context?: ClassDecoratorContext<BaseClass>,
        ): void | BaseClass =>
            context === undefined ? experimentalDecorator(target) : stage3Decorator(target, context);

        return decorator;
    };

    /**
     * A higher-order function that takes an experimental class decorator and
     * transforms it into a class decorator compatible with both modes.
     *
     * @param experimentalDecorator - The experimental class decorator.
     * @returns The combined class decorator.
     */
    export const fromExperimentalDecorator = <BaseClass extends Function & AnyClass = AnyClass>(
        experimentalDecorator: experimentalDecorators.ClassDecorator<BaseClass>,
    ): ClassDecorator<BaseClass> =>
        create(experimentalClassDecoratorToStage3ClassDecorator(experimentalDecorator), experimentalDecorator);

    /**
     * A higher-order function that takes a Stage 3 class decorator and
     * transforms it into a class decorator compatible with both modes.
     *
     * @param stage3Decorator - The Stage 3 class decorator.
     * @returns The combined class decorator.
     */
    export const fromStage3Decorator = <BaseClass extends Function & AnyClass = AnyClass>(
        stage3Decorator: stage3Decorators.ClassDecorator<BaseClass>,
    ): ClassDecorator<BaseClass> =>
        create(stage3Decorator, stage3ClassDecoratorToExperimentalClassDecorator(stage3Decorator));
}
