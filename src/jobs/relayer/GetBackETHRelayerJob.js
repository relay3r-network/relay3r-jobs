const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/GetBackETHRelayer.js");

class GetBackETHRelayerJob extends Job {
    constructor(account, provider) {
        super("GetBackETHRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.workableIndex  = 0;
        this.workable1 = false;
        this.workable2 = false;
    }

    isWorkable = async () =>{
        try {

            this.workable1 = await this.contract.workableQueue();
            this.workable2 = await this.contract.workableSwap();
            if(this.workable1)
                this.workableIndex = 1
            else if (this.workable2)
                this.workableIndex = 2;
            return this.workable1 || this.workable2;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async callWork(gas){
        if(this.workableIndex == 1)
            return await this.contract.clearQueue({
                gasPrice: gas * 1e9,
            });
        else
            return await this.contract.executeSwap({
                gasPrice: gas * 1e9,
            });
    }

}

exports.GetBackETHRelayerJob = GetBackETHRelayerJob;
