const queues = new Map();

function enqueueTask(user_id, taskFunc) {
    if (!queues.has(user_id)) {
        queues.set(user_id, []);
    }
    queues.get(user_id).push(taskFunc);

    processQueue(user_id);
}

function processQueue(user_id) {
    const queue = queues.get(user_id);
    if (queue.length > 0) {
        const taskFunc = queue.shift();
        taskFunc().then(() => {
            if (queue.length > 0) {
                setTimeout(() => processQueue(user_id), 1000); // 1 task per second
            }
        });
    }
}

module.exports = { enqueueTask };
