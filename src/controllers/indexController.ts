import { Auction, Good, User } from "../models";
import { AuctionRepository, GoodRepository, UserRepository } from "../repositorys";
import { PostGoodBidDto } from "../repositorys/dtos/post-goodBid.dto";
import { BusinessLogic } from "../types/BusinessLogic";
import { HttpError } from "../types/HttpError";
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

const postGoodBid: BusinessLogic = async (req, res, next) => {
  const { bid, msg } = req.body as PostGoodBidDto;
  const good: Good = await GoodRepository.getQuery().findByIdWithAuction(req.params.id);
  if(good.price >= bid) {
    throw new HttpError(403, "시작 가격보다 높게 입찰해야 합니다.");
  } 
  if(new Date(good.createdAt).valueOf() + (24*60*60*1000) < new Date().valueOf()) {
    throw new HttpError(403, "경매가 이미 종료되었습니다");
  }
  const user: User = await UserRepository.getQuery().findById(req.user.id);
  const result: Auction = await AuctionRepository.getQuery().createNewAuction(bid, msg, user, good);
  req.app.get("io").to(req.params.id).emit("bid", {
    bid: result.bid,
    msg: result.msg,
    nick: user.nick,
  });
  return res.send("ok");
}

export {
  renderMainPage,
  renderJoinPage,
  renderGoodPage,
  createGood,
  renderAuctionPage,
  postGoodBid
}