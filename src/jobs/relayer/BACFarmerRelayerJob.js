const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/BACFarmerRelayerv2.js");

class BACFarmerRelayerJob extends Job {
    constructor(account, provider) {
        super("BACFarmerRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }
}

exports.BACFarmerRelayerJob = BACFarmerRelayerJob;
