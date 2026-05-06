import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './ghraphql/auth/users/users.module';
import { TenantModule } from './ghraphql/tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['dist/**/*.graphql', 'src/**/*.graphql'],
      sortSchema: true,
      playground: true,
    }),
    UserModule,
    AuthModule,
    UsersModule,
    TenantModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
