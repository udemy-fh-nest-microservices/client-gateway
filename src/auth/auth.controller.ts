import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    try {
      return await firstValueFrom(
        this.natsClient.send('auth.register', registerDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      return await firstValueFrom(this.natsClient.send('auth.login', loginDto));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyToken(@User() user: any, @Token() token: string) {
    return { user, token };
  }
}
