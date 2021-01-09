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
}

export { UserRepository }