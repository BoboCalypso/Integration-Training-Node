import gateway from "../config/gateway.js";

// https://developers.braintreepayments.com/reference/response/transaction/node

export const transactionSale = (req, res) => {
 const amount = req.body.amount;
 const nonceFromTheClient = req.body.paymentMethodNonce;
 // <—- BRAINTREE TRANSACTION SALE API REQUEST -->
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
    },
    (err, result) => {
      if (err) res.status(500).json(err);
      if (result.success) res.status(201).json(result);
      else res.status(400).json(result);
    }
  );
  // <—- END -->
};

