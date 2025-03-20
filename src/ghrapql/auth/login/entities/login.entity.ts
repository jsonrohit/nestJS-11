import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Login {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
