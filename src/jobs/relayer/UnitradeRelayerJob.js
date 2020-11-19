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
}

exports.UnitradeRelayerJob = UnitradeRelayerJob;
