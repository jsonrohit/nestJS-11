import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports:[
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
