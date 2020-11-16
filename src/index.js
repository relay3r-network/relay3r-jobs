const {JobHandler} = require("./JobHandler");
const wallet = require("./config/wallet.js");
const provider = require("./config/provider.js");

const {env} = require("./env");

const jobHandler = new JobHandler(wallet, provider);

for (let job of env.JOBS.split(",")){
    jobHandler.start(job);
}
