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
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('login-by-role')
  @ApiOkResponse({ type: AuthEntity })
  loginByRole(@Query() queryDto: QueryAuthDto, @Body() dataDto: LoginDto) {
    return this.authService.loginByRole(queryDto, dataDto);
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
