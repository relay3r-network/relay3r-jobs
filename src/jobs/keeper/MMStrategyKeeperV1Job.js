const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/MMStrategyKeeperV1.js");

class MMStrategyKeeperV1Job extends Job {
    constructor(account, provider) {
        super("MMStrategyKeeperV1",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.strategies = [
            "0x1f11055eb66f2bba647fb1adc64b0dd4e0018de7",//three_crv_strategy
            "0x5a709dfa094273795b787caafc6855a120b2bebd",//ren_crv_strategy
            "0xf0BA303fd2CE5eBbb22d0d6590463D7549A08388",//comp_dai_strategy
            "0x8f288a56a6c06ffc75994a2d46e84f8bda1a0744",//comp_usdc_strategy
        ]
        this.workableStrats = []
        this.workable = false;
    }
    isWorkable = async () =>{
        try {
            for(let i=0;i<this.strategies.length;i++) {
                let harvestable = await this.contract.callStatic.harvestable(this.strategies[i]);
                if(harvestable)
                    this.workableStrats.push(this.strategies[i]);
                // else this.log.info(`Strat ${i} is not harvestable` );
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

exports.MMStrategyKeeperV1Job = MMStrategyKeeperV1Job;
