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
  async callWork(gas) {
    return await this.contract.work({
      gasPrice: gas,
      gasLimit:9000000
    });
  }
}

exports.SynlRebalancerJob = SynlRebalancerJob;
