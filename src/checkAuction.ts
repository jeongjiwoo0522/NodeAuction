import { Good } from "./models";
import { AuctionRepository, GoodRepository, UserRepository } from "./repositorys";

const checkAuction = async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const targets = await GoodRepository.getQuery().findUnknownSolderGoods(yesterday);
    targets.forEach(async (target: Good) => {
      const success = await AuctionRepository.getQuery().findSoldedAuction(target.id)
      await GoodRepository.getQuery().updateGoodSolder(success.user.id, target.id);
      await UserRepository.getQuery().updateUserBid(success.bid, success.user.id);
    });
  } catch(err) {
    console.error(err);
  }
}

export default checkAuction;