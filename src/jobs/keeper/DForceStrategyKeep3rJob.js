const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/DForceStrategyKeep3r.js");

class DForceStrategyKeep3rJob extends Job {
    constructor(account, provider) {
        super("DForceStrategyKeep3r",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.strategies = [
            "0xA30d1D98C502378ad61Fe71BcDc3a808CF60b897",//StrategyDForceUSDC
            "0x787C771035bDE631391ced5C083db424A4A64bD8" //StrategyDForceUSDT
        ]
        this.workableStrats = []
        this.workable = false;
    }
    isWorkable = async () =>{
        try {
            for(let i=0;i<this.strategies.length;i++) {
                let harvestable = await this.contract.workable(this.strategies[i])
                if(harvestable)
                    this.workableStrats.push(this.strategies[i]);
            }
            return this.workableStrats > 0;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async callWork(gas){
        try{
            for(let i=0;i<this.workableStrats.length;i++) {
                return await this.contract.harvest(this.workableStrats[i],{
                    gasPrice: gas * 1e9,
                })
            }
        }
        catch (error) {
            this.log.error("Error working : "+ error);
            return false;
        }
        return true;
    }
}

exports.DForceStrategyKeep3rJob = DForceStrategyKeep3rJob;
