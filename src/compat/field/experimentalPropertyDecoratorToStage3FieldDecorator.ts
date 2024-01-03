import * as experimentalDecorators from "../../experimentalDecorators/index.js";
import * as stage3Decorators from "../../stage3Decorators/index.js";

export const experimentalPropertyDecoratorToStage3FieldDecorator =
    <BaseTarget = unknown, BaseValue = unknown>(
        experimentalDecorator: experimentalDecorators.PropertyDecorator<BaseTarget>,
    ): stage3Decorators.ClassFieldDecorator<BaseTarget, BaseValue> =>
    (_target, context) => {
        context.addInitializer(function (this) {
            experimentalDecorator(this, context.name);
        });
    };
