import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    })
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  exports: [PrismaService], // Export PrismaService to use in other modules
})

export class AppModule { }