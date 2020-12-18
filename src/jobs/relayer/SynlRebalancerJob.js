const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/SynlRebalancer.js");

class SynlRebalancerJob extends Job {
  constructor(account, provider) {
    super(
      "SynlRebalancer",
      new ethers.Contract(contract.address, contract.abi, account),
      provider
    );
  }
}

exports.SynlRebalancerJob = SynlRebalancerJob;
