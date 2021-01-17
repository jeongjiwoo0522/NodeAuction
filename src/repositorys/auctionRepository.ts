import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Auction, Good, User } from "../models";

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

  public createNewAuction(bid: number, msg: string, user: User, good: Good): Promise<Auction> {
    const auction: Auction = new Auction()
    auction.bid = bid;
    auction.msg = msg;
    auction.user = user;
    auction.good = good;
    return this.manager.save(auction);
  }
}

export { AuctionRepository }