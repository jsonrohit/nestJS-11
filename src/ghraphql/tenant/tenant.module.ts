import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantResolver } from './tenant.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TenantResolver, TenantService, PrismaService],
})
export class TenantModule {}
