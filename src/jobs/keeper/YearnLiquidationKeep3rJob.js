const { Job } = require("../Job");
const ethers = require("ethers");
const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/keeper/YearnLiquidationKeep3r.js");

class YearnLiquidationKeep3rJob extends Job {
  constructor(account, provider) {
    super(
      "YearnLiquidationKeep3r",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }
}

exports.YearnLiquidationKeep3rJob = YearnLiquidationKeep3rJob;
