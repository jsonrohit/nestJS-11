import { Injectable } from '@nestjs/common';
import { CreateLoginInput } from './dto/create-login.input';
import { UpdateLoginInput } from './dto/update-login.input';

@Injectable()
export class LoginService {
  create(createLoginInput: CreateLoginInput) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginInput: UpdateLoginInput) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
