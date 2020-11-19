const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const {Job} = require('../src/jobs/Job');


describe('Job class test', function () {
    it("should work()", async () => {
        const job = new Job("test", {}, {getBlockNumber: ()=> 1});
        const workStub = sinon.stub(job, "work");
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(true)));
        await job.exec();
        expect(workStub.calledOnce).to.be.true;
    })

    it("should not work() bc contract is not workable", async () => {
        const job = new Job("test", {}, {getBlockNumber: ()=> 1});
        const workStub = sinon.stub(job, "work");
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(false)));
        await job.exec();
        expect(workStub.called).to.be.false;
    });

    it("should not work() bc tx pending", async () => {
        const job = new Job("test", {}, {getBlockNumber: ()=> 1});
        const workStub = sinon.stub(job, "work");
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(true)));
        job.txPending = true;
        await job.exec();
        expect(workStub.called).to.be.false;
    })

    it("should not work() bc tx pending and not workable", async () => {
        const job = new Job("test", {},{getBlockNumber: ()=> 1});
        const workStub = sinon.stub(job, "work");
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(false)));
        job.txPending = true;
        await job.exec();
        expect(workStub.called).to.be.false;
    })

    it("should not test isWorkable() bc block already checked", async () => {
        const currentBlock = 10;
        const job = new Job(
            "test",
            {},
            {getBlockNumber: ()=> currentBlock}
            );
        job.lastBlock = currentBlock;
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(false)));
        await job.exec();
        expect(workableStub.called).to.be.false;
    })

    it("should test isWorkable() bc new block", async () => {
        const currentBlock = 10;
        const job = new Job(
            "test",
            {},
            {getBlockNumber: ()=> currentBlock}
        );
        job.lastBlock = currentBlock-1;
        const workableStub = sinon.stub(job, "isWorkable").returns(new Promise(resolve => resolve(false)));
        await job.exec();
        expect(workableStub.calledOnce).to.be.true;
        expect(job.lastBlock).to.be.eq(currentBlock);
    })
});
