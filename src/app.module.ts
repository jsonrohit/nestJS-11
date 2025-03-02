import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PerformanceInterceptor } from './interceptor/performance.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor, // Apply interceptor globally within this module
    },
  ],
  exports: [PrismaService], // Export PrismaService to use in other modules
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Apply to all routes or specify controllers
  }
}