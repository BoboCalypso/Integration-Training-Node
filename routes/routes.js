import express from "express";
import { clientTokenForDropIn } from "../controllers/CLIENT_TOKEN.js";
import { transactionSale } from "../controllers/TRANSACTION.js";
import { clientTokenServer, credentials, index, transaction, transactionReady } from "../controllers/index.js";
import { generateClientToken, transactionAdjustAuthorization, transactionClone, transactionFind, transactionRefund, transactionSaleToken, transactionSearch, transactionSettlementDeclined, transactionSettling, transactionSubmitForPartialSettlement, transactionSubmitForSettlement, transactionVoid } from "../controllers/transactions.js"

const router = express.Router();

router.get("/", index)

router.get("/credentials", credentials)

router.get("/client-token", clientTokenServer)

router.get("/drop-in", clientTokenForDropIn);

router.post("/", transaction);

router.get("/transaction", clientTokenForDropIn);

router.get("/txn-ready/:nonce", transactionReady);

router.post("/transaction-sale", transactionSale);

// <--- Expanded API requests --->

router.get("/more", (req, res) => {
    res.render("more");
  });

// CHECKOUT

router.get("/checkout/drop-in", generateClientToken);

router.get("/checkout/hosted-fields", generateClientToken);

router.get("/checkout/3DS-drop-in", generateClientToken);

router.get("/checkout/paypal", generateClientToken);

router.get("/checkout/google-pay", generateClientToken);

router.get("/checkout/local-payment-methods", generateClientToken);

router.get("/checkout/ach-debit", generateClientToken);

// TRANSACTIONS

router.get("/sale-token", transactionSaleToken);

router.get("/adjust-authorization", transactionAdjustAuthorization);

router.get("/submit-for-settlement", transactionSubmitForSettlement);

router.get("/partial-settlement", transactionSubmitForPartialSettlement);

router.get("/void", transactionVoid);

router.get("/refund", transactionRefund);

router.get("/clone", transactionClone);

router.get("/transaction-find", transactionFind);

router.get("/transaction-search", transactionSearch);

router.get("/transaction-settling", transactionSettling);

router.get("/transaction-settlement-declined", transactionSettlementDeclined);

export default router;
