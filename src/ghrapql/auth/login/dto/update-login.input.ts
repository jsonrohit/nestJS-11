import { CreateLoginInput } from './create-login.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLoginInput extends PartialType(CreateLoginInput) {
  id: number;
}
