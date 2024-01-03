import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";
import type { AnyClass } from "../../types.js";

export const experimentalClassDecoratorToStage3ClassDecorator =
    <BaseClass extends AnyClass = AnyClass>(
        experimentalDecorator: experimentalDecorators.ClassDecorator<BaseClass>,
    ): stage3Decorators.ClassDecorator<BaseClass> =>
    (target, _) =>
        experimentalDecorator(target);
