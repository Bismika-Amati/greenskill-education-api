import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashPassword(plainTextPassword: string): Promise<string> {
  try {
    return await bcrypt.hashSync(plainTextPassword, 10);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}

export async function comparePassword(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(plainTextPassword, hash);
  } catch (error) {
    throw new ConflictException();
  }
}
