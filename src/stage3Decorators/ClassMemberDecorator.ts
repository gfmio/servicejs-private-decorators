import type { AnyMethod } from "../types.js";
import type { ClassAccessorDecorator } from "./ClassAccessorDecorator.js";
import type { ClassFieldDecorator } from "./ClassFieldDecorator.js";
import type { ClassGetterDecorator } from "./ClassGetterDecorator.js";
import type { ClassMethodDecorator } from "./ClassMethodDecorator.js";
import type { ClassSetterDecorator } from "./ClassSetterDecorator.js";

export type ClassMemberDecorator<BaseTarget = unknown, BaseValue = unknown> =
    | ClassMethodDecorator<BaseTarget, BaseValue extends AnyMethod<BaseTarget> ? BaseValue : never>
    | ClassFieldDecorator<BaseTarget, BaseValue>
    | ClassGetterDecorator<BaseTarget, BaseValue>
    | ClassSetterDecorator<BaseTarget, BaseValue>
    | ClassAccessorDecorator<BaseTarget, BaseValue>;
