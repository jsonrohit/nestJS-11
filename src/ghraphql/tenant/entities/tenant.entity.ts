import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tenant {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}
