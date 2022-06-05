import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserResponse } from './entities/user.entity';
import { GetUserArgs, LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { RegisterUserInput } from './dto/register-user.input';
import { AuthService } from 'src/auth/auth.service';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Query(() => [UserResponse], { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(
    @CurrentUser() user: UserResponse,
    @Args() getUserArgs: GetUserArgs,
  ): Promise<User> {
    return await this.userService.user({ id: getUserArgs.id });
  }

  @Mutation(() => UserResponse, { name: 'registerUser' })
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserResponse> {
    const { email, password } = registerUserInput;
    let existingUser = await this.userService.user({ email });

    if (existingUser) {
      return {
        errors: [{ field: 'email', message: 'Email already exists' }],
      };
    }

    let newUser = await this.userService.createUser(registerUserInput);
    let token = await this.authService.login(newUser);
    const user = { ...newUser, authToken: token.access_token };
    return { user };
  }
}
