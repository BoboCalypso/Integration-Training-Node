import gateway from "../config/gateway.js";

//? https://developers.braintreepayments.com/reference/response/transaction/node

export const generateClientToken = (req, res) => {
    const url = req.route.path.substring(1);
    console.log(url)
    let merchantAccountId = "oasiscafe-west-coast"
    if (url === "checkout/ach-debit")
      merchantAccountId = "oasiscafe"
    gateway.clientToken
      .generate({
        merchantAccountId: merchantAccountId
      })
      .then((response) => {
        const clientToken = response.clientToken;
        res.render(url, { clientToken });
      });
  };

export const transactionSaleToken = (req, res) => {
  gateway.transaction.sale(
    {
      amount: 4001,
      paymentMethodToken: "4wsm6xg",
      merchantAccountId: 'oasiscafe-west-coast',
      // options:{
      //   submitForSettlement: true,
      // }
    },
    (err, result) => {
      if (err) res.status(500).json(err);
      if (result.success) res.status(201).json(result);
      else res.status(400).json(result);
    }
  );
};

export const transactionAdjustAuthorization = (req, res) => {
  gateway.transaction.adjustAuthorization(
    "transaction_id",
    {
      amount: 5,
    },
    (err, result) => {
      if (err) res.status(400).json(err);
      if (result.success) res.status(201).json(result);
      else res.status(400).json(result);
    }
  );
};

export const transactionSubmitForSettlement = (req, res) => {
  gateway.transaction.submitForSettlement("96hf4zj3", 35, (err, result) => {
    if (err) res.status(400).json(err);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  });
};

export const transactionSubmitForPartialSettlement = (req, res) => {
gateway.transaction.submitForPartialSettlement("96hf4zj3", 35, (err, result) => {
  if (err) res.status(400).json(err);
  if (result.success) res.status(201).json(result);
  else res.status(400).json(result);
});
};

export const transactionVoid = (req, res) => {
  gateway.transaction.void("transaction_id", (err, result) => {
    if (err) res.status(400).json(err);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  });
};

export const transactionRefund = (req, res) => {
  gateway.transaction.refund("n5c1n1qv", (err, result) => {
    if (err) res.status(400).json(err);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  });
};

export const transactionClone = (req, res) => {
  gateway.transaction.cloneTransaction(
    "transactionId",
    {
      amount: 5,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) res.status(400).json(err);
      if (result.success) res.status(201).json(result);
      else res.status(400).json(result);
    }
  );
};

export const transactionFind = (req, res) => {
  gateway.transaction.find("transactionId", (err, transaction) => {
    if (err) res.status(404).json(err);
    else res.status(200).json(transaction);
  });
};

export const transactionSearch = (req, res) => {
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 1);
  req.session.transactionData = [];

  const transactionStream = gateway.transaction.search((search) => {
    search.createdAt().between(threeMonthsAgo, today);
  });

  transactionStream.on("data", (transaction) => {
    req.session.transactionData.push(transaction);
  });

  transactionStream.on("end", () => {
    res.status(200).json(req.session.transactionData);
  });
};

// export const transactionSearch = (req, res) => {
//   const today = new Date();
//   const past = new Date();
//   past.setMonth(past.getMonth() - 18);

//   const stream = gateway.transaction.search((search) => {
//     search.createdAt().between(past, today);
//   });

//   const chunks = [];

//   new Promise((resolve) => {
//     stream.on("data", (chunk) => chunks.push(chunk));
//     stream.on("error", (err) => console.log(err));
//     stream.on("end", () => {
//       console.log(chunks.length);
//       res.status(200).json(chunks);
//     });
//   });
// };

export const transactionSettling = (req, res) => {
  gateway.testing.settle("hm3z0gcc", (err, result) => {
    if (err) res.status(400).json(err);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  });
};

export const transactionSettlementDeclined = (req, res) => {
  gateway.testing.settlementDecline("hqdbqx18", (err, result) => {
    if (err) res.status(400).json(err);
    if (result.success) res.status(201).json(result);
    else res.status(400).json(result);
  });
};
