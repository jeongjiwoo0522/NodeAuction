import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Auction } from "../models";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {

  static getQuery() {
    return getCustomRepository(AuctionRepository);
  }

  public findAllWithUserOrderbyBid(goodId: string) {
    this.createQueryBuilder("auction")
    .leftJoinAndSelect("auction.user", "User")
    .where("auction.goodId = :id")
    .setParameter("id", +goodId)
    .orderBy("auction.bid", "ASC")
    .getMany();
  }
}

export { AuctionRepository }