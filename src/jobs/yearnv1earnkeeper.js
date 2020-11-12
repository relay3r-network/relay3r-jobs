//Import libraries
const ethers = require("ethers");

//Import config and abis
const wallet = require("../config/wallet.js");
const provider = require("../config/provider.js");
const { address, abi } = require("../abis/sushiswapv2keep3r.js");
const { getCurrentGasPrices } = require("../helper/gasGetter");

//Initialize account and abi
const account = wallet.connect(provider);
const YearnV1EarnKeeper = new ethers.Contract(address, abi, account);

//Global vars for job exec
let jobTXPending = false;
let workable = false;
let gas = 20;

async function UpdateGas() {
  let gasx = await getCurrentGasPrices();
  gas = gasx.high + 7; //Instant execution expected
}

function log(msg) {
  console.log("[YearnV1EarnKeeper] " + msg)
}

async function main() {
  try {
    workable = await YearnV1EarnKeeper.workable();
    if (!jobTXPending && workable) {
      await UpdateGas();
      jobTXPending = true;
      const tx = await YearnV1EarnKeeper.work({
        gasPrice: gas * 1e9
      });
      log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      log(`Transaction confirmed in block ${receipt.blockNumber}`);
      log(`Gas used: ${receipt.gasUsed.toString()}`);
      jobTXPending = false;
    }
  } catch (error) {
    jobTXPending = false;
    log(error.reason);
  }
}

setInterval(async function () {
  if (!jobTXPending) {
    await main();
  }
}, 30000);
