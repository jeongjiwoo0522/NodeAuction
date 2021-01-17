import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../models";
import { CreateUserDto } from "./dtos/create-user.dto";

@EntityRepository(User)
class UserRepository extends Repository<User> {

  static getQuery() {
    return getCustomRepository(UserRepository);
  }

  public findByEmail(email: string): Promise<User> {
    return this
    .createQueryBuilder()
    .where("user.email = :email", { email: email })
    .getOne();
  }

  public findById(id: number): Promise<User> {
    return this
    .createQueryBuilder()
    .where("user.id = :id", { id: id })
    .getOne();
  }

  public createNewUser(userDto: CreateUserDto): Promise<User> {
    const newUser: User = new User();
    newUser.email = userDto.email,
    newUser.nick = userDto.nick,
    newUser.password = userDto.password,
    newUser.money = userDto.money;
    return this.manager.save(newUser);
  }

  public async updateUserBid(bid: number, userId: number) {
    this.createQueryBuilder("user")
    .update()
    .set({ 
      money: () => `money - ${bid}` 
    })
    .where("user.id = :id")
    .setParameter("id", userId)
    .execute();
  }
}

export { UserRepository }