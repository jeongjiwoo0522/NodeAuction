import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Good } from "../models";
import { CreateGoodDto } from './dtos/create-good.dto';
import { UserRepository } from "./userRepository";

@EntityRepository(Good)
class GoodRepository extends Repository<Good> {

  static getQuery() {
    return getCustomRepository(GoodRepository);
  }

  public findById(goodId: string): Promise<Good> {
    return this.createQueryBuilder("good")
    .where("good.id = :id")
    .setParameter("id", +goodId)
    .getOne();
  }

  public findAllBySoldId(): Promise<Good[]> {
    return this
    .createQueryBuilder()
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

  public findByIdIncludeUser(goodId: string): Promise<Good> {
    return this.createQueryBuilder("good")  
    .leftJoinAndSelect("good.owner", "Owner")
    .where("good.id = :id")
    .setParameter("id", +goodId)
    .getOne();
  }

  public findByIdWithAuction(goodId: string): Promise<Good> {
    return this.createQueryBuilder("good")
    .leftJoinAndSelect("good.auctions", "Auction")
    .where("good.id = :id")
    .setParameter("id", +goodId)
    .orderBy("Auction.bid", "DESC")
    .getOne();
  }
}

export { GoodRepository }