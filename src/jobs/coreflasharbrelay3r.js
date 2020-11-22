//Import libraries
const ethers = require("ethers");

//Import config and abis
const wallet = require("../config/wallet.js");
const provider = require("../config/provider.js");
const { address, abi } = require("../abis/coreflasharbrelay3r.js");
const { getCurrentGasPrices } = require("../helper/gasGetter");

//Initialize account and abi
const account = wallet.connect(provider);
const CoreFlashArbRelay3rOptimizedV2 = new ethers.Contract(address, abi, account);

//Global vars for job exec
let jobTXPending = false;
let workable = false;
let gas = 20;

async function UpdateGas() {
  let gasx = await getCurrentGasPrices();
  gas = gasx.high + 2;
}

function log(msg) {
  console.log("[CoreFlashArbRelay3rOptNew] " + msg)
}

async function main() {
  try {
    workable = await CoreFlashArbRelay3rOptimizedV2.hasMostProfitableStrat();
    if (!jobTXPending && workable) {
      await UpdateGas();
      //Get profitable arb strats
      let returnx = await CoreFlashArbRelay3rOptimizedV2.getMostProfitableStratWithToken();
      jobTXPending = true;
      console.log(`Return eth is ${returnx[0].toNumber()}`)
      console.log(`${returnx[1]} is token`);
      //Pass it to tx arg,first arg is the strat and second is the reward token
      const tx = await CoreFlashArbRelay3rOptimizedV2.work(returnx[0].toNumber(),returnx[1],{
        gasPrice: gas * 1e9,
        gasLimit:1000000//1mil gas limit
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
