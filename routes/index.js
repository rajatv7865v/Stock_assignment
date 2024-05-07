import express from "express";
import { StockController, usersController } from "../controllers/index.js";
import authantication from "../middleware/authantication.js";
import authorize from "../middleware/authorization.js";

const route = express.Router();

route.post("/login", usersController.login);
route.post("/register", usersController.register);

route.get(
  "/stocks/buy",
  authantication,
  authorize("BUYER"),
  StockController.stocks
);
route.get(
  "/stocks/share",
  authantication,
  authorize("BROKER"),
  StockController.stocks
);
route.get("/portfolio", authantication, StockController.stocks);

export default route;
