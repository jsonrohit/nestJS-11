import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService], // Export PrismaService to use in other modules
})

export class AppModule { }