const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/sushiswapv2keep3r.js");

class SushiSwapKeep3rJob extends Job {
    constructor(account) {
        super("SushiSwapKeep3r", new ethers.Contract(abi.address, abi.abi, account));
    }
}

exports.SushiSwapKeep3rJob = SushiSwapKeep3rJob;
