const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/Keep3rV1Oracle.js");

class Keep3rV1OracleJob extends Job {
    constructor(account, provider) {
        super("Keep3rV1Oracle",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }

    async callWork(gas){
        return await this.contract.work({
                gasPrice: gas * 1e9,
                gasLimit:7000000
        })
    }
}

exports.Keep3rV1OracleJob = Keep3rV1OracleJob;
