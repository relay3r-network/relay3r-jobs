const { Job } = require("../Job");
const ethers = require("ethers");

const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/relayer/BACFarmerRelayerv2.js");

class BACFarmerRelayerJob extends Job {
  constructor(account, provider) {
    super(
      "BACFarmerRelayer",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }
}

exports.BACFarmerRelayerJob = BACFarmerRelayerJob;
