import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {

    }

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({
            data: createUserDto
        });
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });

        return updatedUser;
    }

    async remove(id: number) {
        return await this.prisma.user.delete({
            where: { id }
        });
    }

}