import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {

    }
    
    create(createUserDto: CreateUserDto) {
        console.log(createUserDto, 'createUserDto');
        return this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id }, // Only works with unique fields
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.prisma.user.update({
            where: { id }, // Ensure the record exists
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({
            where: { id }
        });
    }

}