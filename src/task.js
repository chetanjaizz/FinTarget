const fs = require('fs');
const path = require('path');

async function task(user_id) {
    const logEntry = `${user_id}-task completed at-${Date.now()}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/task_log.txt'), logEntry, 'utf8');
    console.log(logEntry);
}

module.exports = task;
