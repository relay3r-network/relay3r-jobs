const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/unitraderelay3r.js");

class UnitradeRelayerJob extends Job {
    constructor(account, provider) {
        super("UnitradeRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }

    async callWork(gas){
        this.orderList = await this.contract.getExecutableOrdersList();
        log(`Executing orders ${this.orderList.toString()}`);
        return await this.contract.workBatch(this.orderList, {
            gasPrice: gas * 1e9,
        });
    }
}

exports.UnitradeRelayerJob = UnitradeRelayerJob;
