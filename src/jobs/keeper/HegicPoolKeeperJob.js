const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/HegicPoolKeep3r.js");

class HegicPoolKeeperJob extends Job {
    constructor(account) {
        super("HegicPoolKeeper", new ethers.Contract(contract.address, contract.abi, account));
    }

    async callWork(gas){
        return await this.contract.claimRewards(this.profitableStrats, {
            gasPrice: gas * 1e9,
        });
    }
}

exports.YearnV1EarnKeeperJob = HegicPoolKeeperJob;
