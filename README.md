### Describtion
You can add your async task to promise queue in dynamic .  
It's easy and effective .

For example:  
1. normal promise task queue
	
			let PromiseTaskQueue = require('promise-queue-task');
			let normalPromiseTaskQueue = new PromiseTaskQueue();
	
			normalPromiseTaskQueue.add((next, args) => {
	    		setTimeout(() => {
	        	console.log("job one");
	       	next({
	            jobNumber: 1
	        		})
	    		},1000);
			}).add((next, args) => {
	    		console.log("job two", args.jobNumber);
			}); 
	
2. loop promise task queue

		let PromiseTaskQueue = require('promise-queue-task');
		let looPromiseTaskQueue = new PromiseTaskQueue();
		for (let i = 0; i < 10; i++) {
    		looPromiseTaskQueue.add((next, args) => {
        		setTimeout(() => {
            		let arg = Object.assign({jobNumber: 1}, args);
            		console.log("job :" + (arg.jobNumber++));
            		if (looPromiseTaskQueue.isEmpty()) {
                		console.log('task finished')
            		} else {
                		next(arg)
            		}
        		}, 10);
    		})
		}

