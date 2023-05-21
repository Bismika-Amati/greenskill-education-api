import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { comparePassword, hashPassword } from 'src/lib/helper';
import { LoginDto } from './dto';
import { User } from '@prisma/client';
import { QueryAuthDto } from './dto/query-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = comparePassword(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async loginByRole(params: QueryAuthDto, data: LoginDto): Promise<AuthEntity> {
    const { email, password } = data;

    const foundRole = await this.prisma.role.findUnique({
      where: { name: params.role },
    });
    if (!foundRole) {
      throw new NotFoundException(
        `Role with ${foundRole.name} does not exist.`,
      );
    }

    const user = await this.prisma.user.findFirst({
      where: { email, roleId: foundRole.id },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async registerByRole(
    params: QueryAuthDto,
    registerAuthDto: RegisterAuthDto,
  ): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: registerAuthDto.email },
    });
    if (foundUser) {
      throw new BadRequestException(`User with ${foundUser.email} has exist.`);
    }

    const foundRole = await this.prisma.role.findUnique({
      where: { name: params.role },
    });
    if (!foundRole) {
      throw new NotFoundException(
        `Role with ${foundRole.name} does not exist.`,
      );
    }

    registerAuthDto.roleId = foundRole.id;
    registerAuthDto.password = await hashPassword(registerAuthDto.password);

    return await this.prisma.user.create({
      data: registerAuthDto,
    });
  }
}
