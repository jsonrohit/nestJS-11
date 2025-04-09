import { Injectable } from '@nestjs/common';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantService {

  constructor(private prisma: PrismaService) {

  }

  async create(createTenantInput: CreateTenantInput) {
    console.log(`create tenant ${createTenantInput}`);
    return await this.prisma.tenant.create({ data: createTenantInput })
  }

  async findAll() {
    console.log('tenant findall')
    return await this.prisma.tenant.findMany();
  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} tenant`)
    return await this.prisma.tenant.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateTenantInput: UpdateTenantInput) {
    console.log(`This action updates a #${id} tenant`);
    const updatedUser = await this.prisma.tenant.update({
      where: { id },
      data: updateTenantInput,
    });
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} tenant`);
    return await this.prisma.tenant.delete({
      where: { id }
    });
  }
}
