const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/HegicPoolKeep3r.js");

class HegicPoolKeeperJob extends Job {
    constructor(account, provider) {
        super("HegicPoolKeeper",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }

    async callWork(gas){
        return await this.contract.claimRewards({
            gasPrice: gas * 1e9,
        });
    }
}

exports.HegicPoolKeeperJob = HegicPoolKeeperJob;
