import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { JwtMiddleware } from './middleware/jwt/jwt.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './ghrapql/auth/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'], // Load schema from .graphql files
    }),
    UserModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Apply interceptor globally within this module
    },
  ],
  exports: [PrismaService], // Export PrismaService to use in other modules
})

export class AppModule {}


// comment for stop jwt token
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware, JwtMiddleware)
//       .exclude(
//         '/register',  // Exclude specific route
//         '/login',
//           // Exclude all routes in AuthModule
//       )
//       .forRoutes('*'); // Apply to all routes or specify controllers
//   }
// }

