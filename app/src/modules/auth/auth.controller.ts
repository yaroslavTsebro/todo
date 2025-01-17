import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmailSignInStrategy } from './strategies/email/sign-in.strategy';
import { EmailSignUpStrategy } from './strategies/email/sign-up.strategy';
import { AuthService } from './auth.service';
import { EmailAuthPayload } from 'src/shared/dto/auth/email.dto';
import { TokenResponse, RefreshPayload } from 'src/shared/dto/token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailSignUpStrategy: EmailSignUpStrategy,
    private readonly emailSignInStrategy: EmailSignInStrategy,
    private readonly authService: AuthService,
  ) { }

  @Post('/sign-up/email')
  async signUpViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignUpStrategy, payload);
  }

  @Post('/sign-in/email')
  async signInViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignInStrategy, payload);
  }
  
  @Post('/refresh')
  async refresh(@Body() payload: RefreshPayload): Promise<TokenResponse> {
    return this.authService.refreshTokens(payload);
  }
}
