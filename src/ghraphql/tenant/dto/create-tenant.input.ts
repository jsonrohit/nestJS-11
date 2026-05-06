import { IsNotEmpty, IsString } from "class-validator";

export class CreateTenantInput {
    @IsString()
    @IsNotEmpty()
    name: string
}