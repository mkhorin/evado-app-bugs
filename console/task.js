'use strict';
/**
 * Task management
 *
 * node console/task [--config name]
 */
const Application = require('../Application');
const Console = require('evado/console/Console');
const params = Console.parseProcessArguments();
const instance = new Console({Application, params});

(async () => {
    await instance.createTasks();
    process.exit();
})();