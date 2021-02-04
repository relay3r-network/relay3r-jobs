const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/NISTRelayer.js");

class NISTRelayerJob extends Job {
  constructor(account, provider) {
    super(
      "NISTRelayer",
      new ethers.Contract(contract.address, contract.abi, account),
      provider
    );
    this.stakers = 0;
    this.total_to_liq = 0;
  }

  isWorkable = async () => {
    try {
        let workable = await this.contract.workable();
        let workData = await this.contract.getData();
        if(workData[0].length > 0) {
            this.stakers = workData[0];
            this.total_to_liq = workData[1];
        }
        return workable || workData[0].length > 0;
    } catch (error) {
      this.log.error("Error evaluating if workable:" + error);
    }
    return false;
  };

  async callWork(gas) {
      return await this.contract.work(this.stakers, this.total_to_liq, {
        gasPrice: gas,
      });
  }
}

exports.NISTRelayerJob = NISTRelayerJob;