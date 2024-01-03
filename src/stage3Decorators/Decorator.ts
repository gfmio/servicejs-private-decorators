import { ClassDecorator } from "./ClassDecorator.js";
import { ClassMemberDecorator } from "./ClassMemberDecorator.js";

export type Decorator<
    BaseClass extends abstract new (...args: any) => BaseTarget = abstract new (...args: any) => any,
    BaseTarget = unknown,
    BaseValue = unknown,
> = ClassDecorator<BaseClass> | ClassMemberDecorator<BaseTarget, BaseValue>;
