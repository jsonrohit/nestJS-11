import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegisterDto } from './register/dto/create-register.dto';
import { UpdateRegisterDto } from './register/dto/update-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {

  }
  async create(createRegisterDto: CreateRegisterDto) {
    console.log(createRegisterDto, 'createRegisterDto');
    const user = await this.prisma.users.create({
      data: createRegisterDto
    });
    return this.generateToken(user);
  }

  async login(obj: any) {
    const user = await this.prisma.users.findUnique({
      where: { email: obj.email },
    });
    console.log(user, 'useruseruseruseruser');
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(obj.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return {
      user: { ...this.generateToken(user) },
      message: 'Login successful',
    }
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
    delete user.password
    return {
      ...user,
      token: this.jwtService.sign(payload),
      statusCode: 200,
    };
  }
}
