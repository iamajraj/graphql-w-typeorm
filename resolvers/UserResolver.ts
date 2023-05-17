import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../models/User";
import { userRepo } from "../config/db";
import { CreateUserInput } from "../inputs/createUserInput";
import { UpdateUserInput } from "../inputs/updateUserInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await userRepo.find();
  }
  @Query(() => User)
  async user(@Arg("id") id: string) {
    return await userRepo.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    let user = userRepo.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string) {
    await userRepo.delete({
      id: Number(id),
    });
    return `User with id ${id} has been deleted`;
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    if (!data) throw new Error("User data is not provided");
    const user = await userRepo.findOne({
      where: {
        id: Number(id),
      },
    });
    if (!user) throw new Error("The id is not exist");
    Object.assign(user, data);
    await user.save();
    return user;
  }
}
