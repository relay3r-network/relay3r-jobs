const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/SynlRebalancer.js");

class RelayerV1OracleJob extends Job {
  constructor(account, provider) {
    super(
      "SynlRebalancer",
      new ethers.Contract(contract.address, contract.abi, account),
      provider
    );
  }
}

exports.RelayerV1OracleJob = RelayerV1OracleJob;
