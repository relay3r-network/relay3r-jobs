const { Job } = require("../Job");
const ethers = require("ethers");
const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/keeper/LidoKeep3r.js");

class LidoKeep3rJob extends Job {
  constructor(account, provider) {
    super(
      "LidoKeep3r",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }

  async callWork(gas) {
    return await this.contract.work({
      gasPrice: gas
    });
  }
}

exports.LidoKeep3rJob = LidoKeep3rJob;
