import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
export interface IGetUserAuthInfoRequest extends Request {
  user: User; // or any other type
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: IGetUserAuthInfoRequest,
  ): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }
}
