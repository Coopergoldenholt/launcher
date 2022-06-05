import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> | null {
    const user = await this.usersService.user({ email });

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;

    return passwordIsValid ? user : null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.usersService.user({ email: decoded.email });

    if (!user) {
      throw new Error('Invalid token');
    }

    return user;
  }
}
