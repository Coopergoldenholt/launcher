import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { LocalStrategey } from 'src/auth/strategies/local.strategy';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  providers: [
    UserResolver,
    UsersService,
    PrismaService,
    AuthService,
    JwtStrategy,
    LocalStrategey,
  ],
  exports: [UsersService],
})
export class UserModule {}
