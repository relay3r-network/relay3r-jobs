const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/uniswapv2slidingoracle.js");

class UniswapV2SlidingOracleJob extends Job {
    constructor(account) {
        super("UniswapV2SlidingOracle",new ethers.Contract(abi.address, abi.abi, account) );
    }
}

exports.UniswapV2SlidingOracleJob = UniswapV2SlidingOracleJob;
