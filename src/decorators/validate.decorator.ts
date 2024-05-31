import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function GreaterThanOrEqual(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'greaterThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min], // Pass the min value as a constraint
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Allow undefined for optional properties
          // Assert the type of args.object to Record<string, unknown>
          const typedObject = args.object as Record<string, unknown>;
          if (typedObject[propertyName] === undefined) {
            return true;
          }
          const [min] = args.constraints;
          if (typeof value === 'string') {
            if (value === '') return true;
            return parseInt(value) >= min;
          }
          return typeof value === 'number' && value >= min;
        },
      },
    });
  };
}

export function LessThanOrEqual(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'lessThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [max], // Pass the max value as a constraint
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Allow undefined for optional properties
          // Assert the type of args.object to Record<string, unknown>
          const typedObject = args.object as Record<string, unknown>;
          if (typedObject[propertyName] === undefined) {
            return true;
          }
          const [max] = args.constraints;
          if (typeof value === 'string') {
            if (value === '') return true;
            return parseInt(value) >= max;
          }
          return typeof value === 'number' && value <= max;
        },
      },
    });
  };
}
