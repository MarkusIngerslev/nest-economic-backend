// validators/is-date-not-in-future.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDateNotInFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateNotInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date) {
          if (!(value instanceof Date)) return false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value <= today;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be in the future`;
        },
      },
    });
  };
}
