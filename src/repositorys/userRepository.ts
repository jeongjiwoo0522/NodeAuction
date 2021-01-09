import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../models";

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
  public createNewUser(email: string, nick: string, password: string, money: number): Promise<User> {
    const newUser: User = new User();
    newUser.email = email,
    newUser.nick = nick,
    newUser.password = password,
    newUser.money = money;
    return this.manager.save(newUser);
  }
}

export { UserRepository }