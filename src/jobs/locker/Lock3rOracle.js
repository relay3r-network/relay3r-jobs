const { Job } = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/Lock3rOracle.js");

class Lock3rOracleJob extends Job {
  constructor(account, provider) {
    super(
      "Lock3rOracle",
      new ethers.Contract(contract.address, contract.abi, account),
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

exports.Lock3rOracleJob = Lock3rOracleJob;
