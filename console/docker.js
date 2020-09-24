'use strict';

// node console/docker [--config name]

const Application = require('../Application');
const Console = require('evado/console/Console');
const params = Console.parseProcessArguments();
const instance = new Console({Application, params});

(async () => {
    await instance.deployAssets();
    await instance.importDataFiles();
    await instance.startApp();
})();