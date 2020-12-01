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
});
