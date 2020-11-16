class JobExecutor {
        constructor(job) {
            this.job = job;
            this.id = null;
            this.running = false;
        }

        start(){
            this.running = true;
            this.run()
        }

        run() {
            this.job.exec();
            this.id = setTimeout(()=>{
                this.run()
            }, this.getTimeout())
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
