import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {

  }
  create(createUserInput: CreateUserInput) {
    console.log(createUserInput,'createUserInput');
    // return this.prisma.users.create({createUserInput});
  }

  async findAll() {
    console.log('This action returns all users');
      return await this.prisma.users.findMany();
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    return await this.prisma.users.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
