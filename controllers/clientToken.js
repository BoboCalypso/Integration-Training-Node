import gateway from "../config/gateway.js";

// https://developers.braintreepayments.com/reference/request/client-token/generate/node

export const clientTokenGeneration = (req, res) => {
  const url = req.route.path.substring(1);
  // BRAINTREE GENERATE CLIENT TOKEN API REQUEST
  gateway.clientToken
    .generate({})
    .then((response) => {
      const clientToken = response.clientToken;
      res.render(url, { clientToken });
    });
  // <—- END -->
};
