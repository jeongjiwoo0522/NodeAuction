import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Good } from "../models";

@EntityRepository(Good)
class GoodRepository extends Repository<Good> {
  static getQuery() {
    return getCustomRepository(GoodRepository);
  }
  public findAllBySoldId(soldId: number | null): Promise<Good[]> {
    return this
    .createQueryBuilder()
    .where("good.soldId = :soldId", { soldId: soldId })
    .getMany();
  }
}

export { GoodRepository }