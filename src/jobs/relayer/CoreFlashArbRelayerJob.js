const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/CoreFlashArbRelay3r.js");

class CoreFlashArbRelayerJob extends Job {
    constructor(account, provider) {
        super("CoreFlashArbRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.hasMostProfitableStrat = false;
        this.workCallData = undefined;
    }

    isWorkable = async () =>{
        try {
            this.hasMostProfitableStrat = await this.contract.hasMostProfitableStrat();
            return this.hasMostProfitableStrat;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async callWork(gas){
        this.workCallData = await this.contract.getMostProfitableStratWithToken();
        return await this.contract.work(this.workCallData[0],this.workCallData[1], {
            gasPrice: gas * 1e9,
        });
    }

}

exports.CoreFlashArbRelayerJob = CoreFlashArbRelayerJob;
