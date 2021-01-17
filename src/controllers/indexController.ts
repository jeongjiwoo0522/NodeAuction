import { Good } from "../models";
import { AuctionRepository, GoodRepository } from "../repositorys";
import { BusinessLogic } from "../types/BusinessLogic";
import { CreateGoodDto } from './../repositorys/dtos/create-good.dto';

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
  const { name, price } = req.body as CreateGoodDto;
  await GoodRepository.getQuery()
  .createNewGood({ ownerId: req.user.id, name, img: req.file.filename, price});
  res.redirect("/");
}

const renderAuctionPage: BusinessLogic = async (req, res, next) => {
  const [good, auction] = await Promise.all([
    GoodRepository.getQuery().findByIdIncludeUser(req.params.id),
    AuctionRepository.getQuery().findAllWithUserOrderbyBid(req.params.id),
  ]);
  res.render("auction", {
    title: `${good.name} - NodeAuction`,
    good,
    auction,
  });
}

export {
  renderMainPage,
  renderJoinPage,
  renderGoodPage,
  createGood,
  renderAuctionPage
}