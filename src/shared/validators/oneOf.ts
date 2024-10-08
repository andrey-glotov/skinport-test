import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class OneOfConstraint implements ValidatorConstraintInterface {
  constructor(private readonly validValues: Array<unknown>) {}
  validate(activities: unknown) {
    return Array.isArray(activities)
      ? activities.every((item) => this.validValues.includes(item))
      : this.validValues.includes(activities);
  }
}
export function OneOf<T>(
  values: Array<T>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: validationOptions.message ?? 'this value is not allowed',
      },
      constraints: [],
      validator: new OneOfConstraint(values),
    });
  };
}
