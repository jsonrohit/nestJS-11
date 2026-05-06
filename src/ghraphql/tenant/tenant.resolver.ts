import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TenantService } from './tenant.service';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';

@Resolver('Tenant')
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) { }

  @Mutation('createTenant')
  async create(@Args('createTenantInput') createTenantInput: CreateTenantInput) {
    try {
      return await this.tenantService.create(createTenantInput);
    } catch (error) {
      console.log('resolver:- tentant->create ', error);
    }
  }

  @Query('tenant')
  async findAll() {
    try {
      return await this.tenantService.findAll();
    } catch (error) {
      console.log('resolver:- tentant->findAll ', error);
    }
  }

  @Query('tenant')
  async findOne(@Args('id') id: number) {
    try {
      return await this.tenantService.findOne(id);
    } catch (error) {
      console.log('resolver:- tentant->findOne ', error);
    }
  }

  @Mutation('updateTenant')
  async update(@Args('updateTenantInput') updateTenantInput: UpdateTenantInput) {
    return await this.tenantService.update(updateTenantInput.id, updateTenantInput);
  } catch(error) {
    console.log('resolver:- tentant->update ', error);
  }

  @Mutation('removeTenant')
  async remove(@Args('id') id: number) {
    try {
      return await this.tenantService.remove(id);
    } catch (error) {
      console.log('resolver:- tentant->delete ', error);
    }
  }
}
