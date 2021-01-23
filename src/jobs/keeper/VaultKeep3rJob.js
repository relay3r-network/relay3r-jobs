const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/VaultKeep3r.js");

class VaultKeep3rJob extends Job {
  constructor(account, provider) {
    super(
      "VaultKeep3r",
      new ethers.Contract(contract.address, contract.abi, account),
      provider
    );
    this.vaults = [];
    this.workableVaults = [];
    this.workable = false;
  }
  isWorkable = async () => {
    try {
      //Get strats
      this.vaults = await this.contract.vaults();
      for (let i = 0; i < this.vaults.length; i++) {
        let workable = await this.contract.callStatic.workable(
          this.vaults[i]
        );
        if (workable) this.workableVaults.push(this.vaults[i]);
        else this.log.info(`Strat ${i} is not workable` );
      }
      return this.workableVaults > 0;
    } catch (error) {
      this.log.error("Error evaluating if workable:" + error);
    }
    return false;
  };

  async callWork(gas) {
    try {
      for (let i = 0; i < this.workableVaults.length; i++) {
        return await this.contract.earn(this.workableVaults[i], {
          gasPrice: gas,
        });
      }
    } catch (error) {
      this.log.error("Error working : " + error);
      return false;
    }
    return true;
  }
}

exports.VaultKeep3rJob = VaultKeep3rJob;
