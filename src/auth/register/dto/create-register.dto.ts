import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    mobile: number;

    @IsNotEmpty()
    tenantId: number;

    @IsNotEmpty()
    password: string;
}
