const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/CoreFlashArbRelay3r.js");

class CoreFlashArbRelayerJob extends Job {
    constructor(account) {
        super("CoreFlashArbRelayer", new ethers.Contract(abi.address, abi.abi, account));
        this.profitableStrats = [];
    }

    async isWorkable(){
        try {
            this.profitableStrats = await this.contract.profitableStrats();
            return this.profitableStrats.length > 0;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error.reason);
        }
        return false;
    }

    async callWork(gas){
        return await this.contract.workBatch(this.profitableStrats, {
            gasPrice: gas * 1e9,
        });
    }

}

exports.CoreFlashArbRelayerJob = CoreFlashArbRelayerJob;
