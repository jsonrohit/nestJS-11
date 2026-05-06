import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // On module initialization, connect to the database
  async onModuleInit() {
    await this.$connect();
  }

  // On module destruction, disconnect from the database
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
