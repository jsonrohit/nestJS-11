import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
        @Field(() => Int)
        id: number;
}