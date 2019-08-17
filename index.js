/**
 * Created by yinchensan on 2019/8/17.
 */



let Queue = require('./effective-queue');

class PromiseQueue {

    constructor() {
        this.queue = new Queue();
        this.runCount = 0;
        this.lastRunSuccessRes;
    }

    add(request) {
        this.runCount++;
        this.queue.enqueue(() =>
            new Promise((resolve) => {
                request && request(resolve, this.lastRunSuccessRes);
            })
        );
        this._next();
        return this;
    }

    getLength() {
        return this.queue.getLength();
    }

    isEmpty() {
        return (this.getLength() === 0);
    }

    _next() {
        if (this.runCount === this.queue.getLength() && !this.queue.isEmpty()) {
            let final = (res) => {
                this.runCount--;
                this.lastRunSuccessRes = res;
                this._next();
            };
            this.queue.dequeue()().then(final);
        }

    }
}

module.exports = PromiseQueue;

