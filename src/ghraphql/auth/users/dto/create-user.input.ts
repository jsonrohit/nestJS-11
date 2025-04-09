import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobile: number;

    @IsNotEmpty()
    tenantId: number;

    @IsNotEmpty()
    password: string;
}