import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Auction, Good, User } from "../models";

@EntityRepository(Auction)
class AuctionRepository extends Repository<Auction> {

  static getQuery() {
    return getCustomRepository(AuctionRepository);
  }

  public findAllWithUserOrderbyBid(goodId: string): Promise<Auction[]> {
    return this.createQueryBuilder("auction")
    .leftJoin("auction.user", "User")
    .select("auction.bid")
    .addSelect("auction.msg")
    .addSelect("User.nick")
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