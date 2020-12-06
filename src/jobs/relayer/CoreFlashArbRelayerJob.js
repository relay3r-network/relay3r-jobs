const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/CoreFlashArbRelay3r.js");

class CoreFlashArbRelayerJob extends Job {
    constructor(account, provider) {
        super("CoreFlashArbRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.hasMostProfitableStrats = false;
        this.workCallData = undefined;
    }

    isWorkable = async () =>{
        try {
            this.hasMostProfitableStrats = await this.contract.callStatic.hasMostProfitableStrat();
            return this.hasMostProfitableStrat;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async callWork(gas){
        this.workCallData = await this.contract.getMostProfitableStratWithToken();
        return await this.contract.work(this.workCallData[0],this.workCallData[1], {
            gasPrice: gas,
        });
    }

}

exports.CoreFlashArbRelayerJob = CoreFlashArbRelayerJob;
