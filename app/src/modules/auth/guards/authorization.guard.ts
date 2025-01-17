import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization'];
    
    if (!accessToken) {
      throw new UnauthorizedException('No access token in headers');
    }

    try {
      const [_, token] = accessToken.split(' ');
      const payload = verify(token, this.configService.get<string>('JWT_ACCESS_SECRET')) as { sub: string; email: string; };
      const user = await this.userService.getUserById(+payload.sub);

      if (!user) { throw new UnauthorizedException('User not found'); }

      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
