import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// <--- SET UP GATEWAY CONFIGURATION BELOW --->
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "rb2zdhvv9n4r4bsc",
  publicKey: "bfqym4rbfbnnk3bz",
  privateKey: "b89c49b63d0cf136a972d65d9e745e90"
});
// <--- / END --->

export default gateway;
