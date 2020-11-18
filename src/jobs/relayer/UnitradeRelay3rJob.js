const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/relayer/unitraderelay3r.js");

class UnitradeRelay3rJob extends Job {
    constructor(account) {
        super("UnitradeRelay3r", new ethers.Contract(contract.address, contract.abi, account));
    }
}

exports.UnitradeRelay3rJob = UnitradeRelay3rJob;
