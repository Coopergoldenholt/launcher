import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

Injectable();
export class LocalStrategey extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string): Promise<User> {
    const user = this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
