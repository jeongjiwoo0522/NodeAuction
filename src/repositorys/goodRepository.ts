import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Good } from "../models";
import { CreateGoodDto } from './dtos/create-good.dto';
import { UserRepository } from "./userRepository";

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
  public async createNewGood(goodDto: CreateGoodDto): Promise<Good> {
    const newGood: Good = new Good();
    newGood.owner = await UserRepository.getQuery().findById(goodDto.ownerId);
    newGood.name = goodDto.name;
    newGood.img = goodDto.img;
    newGood.price = goodDto.price;
    return this.manager.save(newGood);
  }
}

export { GoodRepository }