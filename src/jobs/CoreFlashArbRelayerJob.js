const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/CoreFlashArbRelay3r.js");

class CoreFlashArbRelayerJob extends Job {
    constructor(account) {
        super("CoreFlashArbRelayer", new ethers.Contract(abi.address, abi.abi, account));
        this.profitableStrats = null;
    }

    async isWorkable(){
        try {
            this.profitableStrats = await this.contract.profitableStrats();
            return this.profitableStrats.length > 0;
        } catch (error) {
            this.log.error("Error evaluating if workable:", error);
        }
        return false;
    }

    callWork(gas){
        return this.contract.work(this.profitableStrats, {
            gasPrice: gas * 1e9,
        });
    }

}

exports.CoreFlashArbRelayerJob = CoreFlashArbRelayerJob;
