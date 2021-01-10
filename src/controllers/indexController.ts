import { Good } from "../models";
import { GoodRepository } from "../repositorys";
import { BusinessLogic } from "../types/BusinessLogic";

const renderMainPage: BusinessLogic = async (req, res, next) => {
  const goods: Good[] = await GoodRepository.getQuery().findAllBySoldId(null);
  res.render("main", {
    title: "NodeAuction",
    goods: goods,
  });
}

const renderJoinPage: BusinessLogic = async (req, res, next) => {
  res.render("join", {
    title: "회원가입 - NodeAuction",
  });
}

const renderGoodPage: BusinessLogic = async (req, res, next) => {
  res.render("good", { 
    title: "상품등록 - NodeAuction",
  });
}

const createGood: BusinessLogic = async (req, res, next) => {
  const { name, price } = req.body as { name: string, price: number };
  await GoodRepository.getQuery()
  .createNewGood(req.user.id, name, req.file.filename, price);
  res.redirect("/");
}

export {
  renderMainPage,
  renderJoinPage,
  renderGoodPage,
  createGood,
}