import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateTenantInput } from './create-tenant.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateTenantInput extends PartialType(CreateTenantInput) {
  @Field(() => Int)
  id: number;
}