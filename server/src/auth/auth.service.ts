import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const userEmailFromEnv = this.configService.get<string>('USER_EMAIL');
    const userPasswordFromEnv = this.configService.get<string>('USER_PASSWORD');
    const isCurrentUser =
      email === userEmailFromEnv && password === userPasswordFromEnv;
    if (!isCurrentUser) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: await this.jwtService.signAsync({ email }),
    };
  }
}
