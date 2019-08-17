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
			


	[console:]  
	job one  
	job two 1  

	
	
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

	[console:]  
	job :1  
	job :2  
	job :3  
	job :4  
	job :5  
	job :6  
	job :7  
	job :8  
	job :9  
	job :10  
	task finished





