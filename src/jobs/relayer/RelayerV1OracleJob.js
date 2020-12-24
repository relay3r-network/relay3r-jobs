const { Job } = require("../Job");
const ethers = require("ethers");
const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/relayer/RelayerV1Oracle.js");

class RelayerV1OracleJob extends Job {
  constructor(account, provider) {
    super(
      "RelayerV1Oracle",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }

  async callWork(gas) {
    return await this.contract.work({
      gasPrice: gas,
      gasLimit: 3500000,
    });
  }
}

exports.RelayerV1OracleJob = RelayerV1OracleJob;
