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
  public createNewGood(ownerId: number, name: string, img: string, price: number): Promise<Good> {
    const newGood: Good = new Good();
    newGood.owner.id = ownerId;
    newGood.name = name;
    newGood.img = img;
    newGood.price = price;
    return this.manager.save(newGood);
  }
}

export { GoodRepository }