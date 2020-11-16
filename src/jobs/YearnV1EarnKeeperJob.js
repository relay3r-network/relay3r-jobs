const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/yearnv1keeper.js");

class YearnV1EarnKeeperJob extends Job {
    constructor(account) {
        super("YearnV1Keeper", new ethers.Contract(abi.address, abi.abi, account));
    }
}

exports.YearnV1EarnKeeperJob = YearnV1EarnKeeperJob;
