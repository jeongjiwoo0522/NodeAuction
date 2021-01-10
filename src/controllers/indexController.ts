import { Good } from "../models";
import { GoodRepository } from "../repositorys";
import { BusinessLogic } from "../types/BusinessLogic";

const renderJoinPage: BusinessLogic = async (req, res, next) => {
  const goods: Good[] = await GoodRepository.getQuery().findAllBySoldId(null);
  res.render("main", {
    title: "NodeAuction",
    goods: goods,
  });
}