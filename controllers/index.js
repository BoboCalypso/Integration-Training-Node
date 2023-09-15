import gateway from "../config/gateway.js";
import fs from "fs";
import { clientTokenGeneration } from "./CLIENT_TOKEN.js";
import { updateData } from "../utils/functions.js"

export const index = async (req, res) => {
  const data = fs.readFileSync('./data/data.json');
  const parsedData = JSON.parse(data)
  res.render("index", {parsedData});
};

export const credentials = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate();
    updateData("credentialsCompleted")
    var feedback = { status: "SUCCESS", data: gateway.config }
  } catch (exception) {
    console.log(exception)
    var feedback = { status: "FAILURE", data: exception }
  }
  res.render("credentials", { feedback });
};

export const clientTokenServer = async (req, res) => {
  try {
    const result = await clientTokenGeneration()
    const clientToken = result.clientToken
    updateData("clientTokenCompleted")
    var feedback = { status: "SUCCESS", token: clientToken, decoded: Buffer.from(clientToken, 'base64').toString('utf8') }
  } catch (exception) {
    console.log(exception)
    var feedback = { status: "FAILURE", data: exception }
  }
  res.render("client-token", { feedback });
};

export const transaction = (req, res) => {
  updateData("dropinCompleted")
  res.redirect(`/txn-ready/${req.body.payment_method_nonce}`)
}

export const transactionReady = (req, res) => {
  const nonce = req.params.nonce
  res.render("txn-ready", {nonce})
}