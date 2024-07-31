import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requestToken = this.extractTokenFromHeader(request);

    if (!requestToken) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const { user, token } = await firstValueFrom(
        this.natsClient.send('auth.verify', { token: requestToken }),
      );

      request['user'] = user;
      request['token'] = token;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
