import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto';
import { AuthEntity } from './entity';

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
  loginByRole(@Body() params: LoginDto) {
    return this.authService.loginByRole(params);
  }
}
