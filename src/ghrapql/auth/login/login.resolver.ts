import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { CreateLoginInput } from './dto/create-login.input';
import { UpdateLoginInput } from './dto/update-login.input';
import { Login } from './entities/login.entity';

@Resolver(() => Login)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  // @Mutation('createLogin')
  @Mutation(() => Login)
  create(@Args('createLoginInput') createLoginInput: CreateLoginInput) {
    return this.loginService.create(createLoginInput);
  }

  // @Query('login')
  @Query(() => [Login])
  findAll() {
    console.log('gggggg');
    return this.loginService.findAll();
  }

  @Query('login')
  findOne(@Args('id') id: number) {
    return this.loginService.findOne(id);
  }

  @Mutation('updateLogin')
  update(@Args('updateLoginInput') updateLoginInput: UpdateLoginInput) {
    return this.loginService.update(updateLoginInput.id, updateLoginInput);
  }

  @Mutation('removeLogin')
  remove(@Args('id') id: number) {
    return this.loginService.remove(id);
  }
}
