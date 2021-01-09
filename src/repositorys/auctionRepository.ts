import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Auction } from "../models";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {
  static getQuery() {
    return getCustomRepository(AuctionRepository);
  }
}

export { AuctionRepository }