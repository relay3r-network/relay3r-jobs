const { getCurrentGasPrices } = require("../helper/gasGetter");
const { Logger } = require("../helper/logger")

class Job {
    constructor(jobName, contract, provider) {
        this.txPending = false;
        this.contract = contract;
        this.name = jobName;
        this.log = Logger(jobName);
        this.provider = provider;
        this.timeout = 25000
    }

    async exec(){
        const workable = await this.isWorkable();
        if (!this.txPending && workable) {
            await this.work();
        }
    }

    async isWorkable(){
        try {
            return await this.contract["workable()"]();
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async getGas(){
        return (await getCurrentGasPrices()).high + 3
    }

    async work(){
        this.txPending = true;
        try {
            const gas = await this.getGas();
            const tx = await this.callWork(gas);
            this.log.info(`Transaction hash: ${tx.hash}`);
            const receipt = await tx.wait();
            this.log.info(`Transaction confirmed in block ${receipt.blockNumber}`);
            this.log.info(`Gas used: ${receipt.gasUsed.toString()}`);
        } catch (error) {
            this.log.error("While working:"+error);
        }
        this.txPending = false;
    }

    async callWork(gas){
        return this.contract.work({
            gasPrice: gas * 1e9,
        });
    }

    getNextExecTimeout() {
        return this.timeout;//Check each 25 seconds
    }
}

exports.Job = Job;
