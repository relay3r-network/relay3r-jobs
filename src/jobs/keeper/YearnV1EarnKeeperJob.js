const { Job } = require("../Job");
const ethers = require("ethers");
const StandardJobABI = require("../../constants/StandardJobABI");

const contract = require("../../contracts/keeper/yearnv1keeper.js");

class YearnV1EarnKeeperJob extends Job {
  constructor(account, provider) {
    super(
      "YearnV1Keeper",
      new ethers.Contract(contract.address, StandardJobABI, account),
      provider
    );
  }
}

exports.YearnV1EarnKeeperJob = YearnV1EarnKeeperJob;
