const { Job } = require("../Job");
const ethers = require("ethers");
const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/keeper/SushiswapV1Oracle.js");

class SushiswapV1OracleJob extends Job {
  constructor(account, provider) {
    super(
      "SushiswapV1Oracle",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }

  async callWork(gas) {
    return await this.contract.work({
      gasPrice: gas,
      gasLimit: 7000000,
    });
  }
}

exports.SushiswapV1OracleJob = SushiswapV1OracleJob;
