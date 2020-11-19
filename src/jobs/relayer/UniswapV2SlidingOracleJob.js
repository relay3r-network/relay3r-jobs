const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/uniswapv2slidingoracle.js");

class UniswapV2SlidingOracleJob extends Job {
    constructor(account, provider) {
        super("UniswapV2SlidingOracle",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }
}

exports.UniswapV2SlidingOracleJob = UniswapV2SlidingOracleJob;
