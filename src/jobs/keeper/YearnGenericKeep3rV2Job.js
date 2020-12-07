const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/YearnGenericKeep3rV2.js");

class YearnGenericKeep3rV2Job extends Job {
  constructor(account, provider) {
    super(
      "YearnGenericKeep3rV2",
      new ethers.Contract(contract.address, contract.abi, account),
      provider
    );
    this.strategies = [];
    this.harvestableStrats = [];
    this.tendableStrats = [];
    this.workable = false;
  }

  containsStringInarray(arr, str) {
    return new RegExp(arr.join("|")).test(str);
  }

  isWorkable = async () => {
    try {
      //Fill strats array
      this.strategies = await this.contract.strategies();
      for (let i = 0; i < this.strategies.length; i++) {
        let currStrat = this.strategies[i];
        let harvestable =
          (await this.contract.callStatic.requiredHarvest(currStrat)) > 0 &&
          (await this.contract.callStatic.harvestable(currStrat));
        if (harvestable) this.harvestableStrats.push(currStrat);
        let tendable =
          (await this.contract.callStatic.requiredTend(currStrat)) > 0 &&
          (await this.contract.callStatic.tendable(currStrat));
        if (tendable) {
          this.tendableStrats.push(currStrat);
        }
        // else this.log.info(`Strat ${this.stratNames[i]} is not harvestable`)
      }
      this.workable =
        this.harvestableStrats.length > 0 || this.tendableStrats.length > 0;
      return this.workable;
    } catch (error) {
      this.log.error("Error evaluating if workable:" + error);
    }
    return false;
  };

  async callWork(gas) {
    try {
      for (let i = 0; i < this.harvestableStrats.length; i++) {
        return await this.contract.harvest(this.harvestableStrats[i], {
          gasPrice: gas,
        });
      }
      for (let i = 0; i < this.tendableStrats.length; i++) {
        return await this.contract.tend(this.tendableStrats[i], {
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

exports.YearnGenericKeep3rV2Job = YearnGenericKeep3rV2Job;
