//Import libraries
const ethers = require("ethers");
const { Logger } = require("../helper/logger")
const log = Logger("SushiSwapKeep3r");

//Import config and abis
const wallet = require("../config/wallet.js");
const provider = require("../config/provider.js");
const { address, abi } = require("../abis/unitraderelay3r.js");
const { getCurrentGasPrices } = require("../helper/gasGetter");

//Initialize account and abi
const account = wallet.connect(provider);
const UnitradeRelay3r = new ethers.Contract(address, abi, account);

//Global vars for job exec
let jobTXPending = false;
let workable = false;
let gas = 20;

async function UpdateGas() {
  let gasx = await getCurrentGasPrices();
  gas = gasx.high + 7; //Instant execution expected
}

async function main() {
  try {
    workable = await UnitradeRelay3r.workable();
    if (!jobTXPending && workable) {
      await UpdateGas();
      jobTXPending = true;
      const tx = await UnitradeRelay3r.work({
        gasPrice: gas * 1e9
      });
      log.info(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      log.info(`Transaction confirmed in block ${receipt.blockNumber}`);
      log.info(`Gas used: ${receipt.gasUsed.toString()}`);
      jobTXPending = false;
    }
  } catch (error) {
    jobTXPending = false;
    log.error(error.reason);
  }
}

setInterval(async function () {
  if (!jobTXPending) {
    await main();
  }
}, 2000);
