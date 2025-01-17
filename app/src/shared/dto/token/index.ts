import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthTokenPayload, ITokenResponse } from 'src/shared/contracts/dto/token';

export class TokenResponse implements ITokenResponse {
  constructor(public accessToken: string, public refreshToken: string) { }
}

export class RefreshPayload {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class AuthTokenPayload implements IAuthTokenPayload {
  constructor(public sub: string, public email: string) { }
}
