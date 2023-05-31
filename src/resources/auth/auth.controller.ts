import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto';
import { AuthEntity } from './entity';
import { QueryAuthDto } from './dto/query-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResponseEntity } from 'src/lib/entities';
import { UserEntity } from '../master-data/users/entities';

@Controller({
  path: 'auth',
  version: ['1.0.0'],
})
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.login(email, password);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: user,
    });
  }

  @Post('login-by-role')
  @ApiOkResponse({ type: AuthEntity })
  async loginByRole(
    @Query() queryDto: QueryAuthDto,
    @Body() dataDto: LoginDto,
  ) {
    const user = await this.authService.loginByRole(queryDto, dataDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: user,
    });
  }

  @Post('register-by-role')
  @ApiOkResponse({ type: AuthEntity })
  async registerByRole(
    @Query() queryDto: QueryAuthDto,
    @Body() dataDto: RegisterAuthDto,
  ) {
    const user = await this.authService.registerByRole(queryDto, dataDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new UserEntity(user),
    });
  }
}
