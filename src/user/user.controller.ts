import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, InternalServerErrorException, ConflictException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        status: 'success',
        data: user,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email is already taken');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return {
        status: 'success',
        data: users,
        message: 'Users retrieved successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parsedId = +id;
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a number');
    }
    try {
      const user = await this.userService.findOne(parsedId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(+id, updateUserDto)
      return {
        status: 'success',
        data: user,
        message: 'User updated successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email is already taken');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.userService.remove(+id);
      return {
        status: 'success',
        data: user,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}