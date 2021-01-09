import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Good } from "../models";

@EntityRepository(Good)
class GoodRepository extends Repository<Good> {
  static getQuery() {
    return getCustomRepository(GoodRepository);
  }
}

export { GoodRepository }