import express from "express";
import { clientTokenGeneration } from "../controllers/clientToken.js";
import { transactionSale } from "../controllers/transactions.js";

const router = express.Router();

router.get("/", (req, res) => res.render("home"))

router.get("/drop-in", clientTokenGeneration);

router.get("/hosted-fields", clientTokenGeneration);

router.get("/three-d-secure", clientTokenGeneration);

router.post("/transaction-sale", transactionSale);

export default router;
