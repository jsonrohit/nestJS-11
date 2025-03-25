import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    password: string;
}
