import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('register')
export class RegisterController {
  constructor(private registerService: AuthService) { }

  @Post()
  async create(@Body() createRegisterDto: CreateRegisterDto) {
    const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10);
    createRegisterDto.password = hashedPassword
    try {
      const user = await this.registerService.create(createRegisterDto);
      return {
        status: 'success',
        data: user,
        message: 'Account created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email is already taken');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get('/users')
  async findAll() {
    try {
      const users = await this.registerService.findAll()
       users.map((user:any) => delete user.password);
       return users;
    }catch (error) {
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: CreateRegisterDto) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(+id);
  }

}
