/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    build: [{
        Class: 'FileMerger',
        sources: [
            'front/Front.js',
            'front/Element.js',
            'front/Loadable.js',
            'front/form/Form.js',
            'front/page/Page.js',
            'front/task/Task.js',
            'front'
        ],
        target: 'dist/front.min.js'
    }],

    deploy: {
        'vendor': 'dist/front.min.js'
    }
};