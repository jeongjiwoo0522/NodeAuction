import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../models";

@EntityRepository()
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email: email }
    });
  }
  public findById(id: number): Promise<User> {
    return this.findOne({
      where: { id: id },
    });
  }
}

const UserQuery: UserRepository = getCustomRepository(UserRepository);

export { UserQuery }