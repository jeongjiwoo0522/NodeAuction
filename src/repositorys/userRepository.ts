import { EntityRepository, Repository } from "typeorm";
import { User } from "../models";

@EntityRepository()
class UserRepository extends Repository<User> {
  
}

export { UserRepository }