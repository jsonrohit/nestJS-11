import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginDto } from './login/dto/create-login.dto';
import { CreateRegisterDto } from './register/dto/create-register.dto';
import * as bcrypt from 'bcrypt';
import { UpdateLoginDto } from './login/dto/update-login.dto';

export type AuthResponse = Omit<User, 'password'> & {
  token: string;
  statusCode: number;
};

export type LoginResponse = {
  user: AuthResponse;
  message: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<AuthResponse> {
    console.log(createRegisterDto, 'createRegisterDto');
    const user = await this.prisma.user.create({
      data: createRegisterDto,
    });
    return this.generateToken(user);
  }

  async login(dto: CreateLoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    console.log(user, 'useruseruseruseruser');
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return {
      user: this.generateToken(user),
      message: 'Login successful',
    };
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): string {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateLoginDto): string {
    return `This action updates a #${id} auth`;
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`;
  }

  generateToken(user: User): AuthResponse {
    const {...rest } = user;
    const payload = { sub: user.id, email: user.email };
    return {
      ...rest,
      token: this.jwtService.sign(payload),
      statusCode: 200,
    };
  }
}
