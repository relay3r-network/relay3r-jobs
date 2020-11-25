class JobExecutor {
        constructor(job, provider) {
            this.job = job;
            this.id = null;
            this.running = false;
            this.lastBlock = 0;
            this.provider = provider;
        }

        start(){
            this.running = true;
            this.run()
        }

        async run() {
            if (await this.isNewBlock()) {
                this.job.exec();
            }
            this.id = setTimeout(()=>{
                this.run()
            }, this.getTimeout())
        }

        async isNewBlock(){
            const currentBlock = await this.provider.getBlockNumber();
            if (currentBlock === this.lastBlock) {
                return false;
            }
            this.lastBlock = currentBlock;
            return true;
        }

        getTimeout(){
            return this.job.getNextExecTimeout();
        }

        stop(){
            this.running = false;
            clearTimeout(this.id);
            this.id = null;
        }
}

exports.JobExecutor = JobExecutor;
