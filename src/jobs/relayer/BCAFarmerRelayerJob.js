const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/BCAFarmerRelayer.js");

class BCAFarmerRelayerJob extends Job {
    constructor(account, provider) {
        super("BCAFarmerRelayer",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
    }
}

exports.BCAFarmerRelayerJob = BCAFarmerRelayerJob;
