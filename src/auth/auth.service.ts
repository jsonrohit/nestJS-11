import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegisterDto } from './register/dto/create-register.dto';
import { UpdateRegisterDto } from './register/dto/update-register.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {

  }
  async create(createRegisterDto: CreateRegisterDto) {
    console.log(createRegisterDto,'createRegisterDto');
    const user =  await this.prisma.users.create({
      data: createRegisterDto
    });
    console.log(this.generateToken(user),'this.generateToken(user)');
    user['token'] = this.generateToken(user);
    console.log(user,'final')
    return user;
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateRegisterDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  generateToken(user) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
