import { PrismaClient } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsExistsConstraint implements ValidatorConstraintInterface {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async validate(value: any, args: ValidationArguments) {
    const params = args.constraints;
    const model = params[0];
    const field = params[1];

    try {
      const exists = await this.query(model, field, value);
      await this.prisma.$disconnect();
      return exists;
    } catch (error) {
      console.error(error);
      await this.prisma.$disconnect();
      return false;
    }
  }

  async query(model, field, value): Promise<boolean> {
    const exists = await this.prisma[model].findFirst({
      where: {
        [field]: value,
      },
    });

    if (exists) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `$property with ${args.value} doesn't exist.`;
  }
}

export function IsExists(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: IsExistsConstraint,
    });
  };
}
