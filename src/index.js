const {JobHandler} = require("./JobHandler");
const wallet = require("./config/wallet.js");
const provider = require("./config/provider.js");


const jobHandler = new JobHandler(wallet, provider);
jobHandler.start("UnitradeRelay3r");
jobHandler.start("UniswapV2SlidingOracle");
