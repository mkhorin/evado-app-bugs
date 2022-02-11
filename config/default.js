'use strict';

module.exports = {

    title: 'Bugs',

    components: {
        'db': {
            settings: {
                'database': process.env.MONGO_NAME || 'evado-bugs',
            }
        },
        'cookie': {
            secret: 'bugs.evado'
        },
        'session': {
            secret: 'bugs.evado'
        },
        'i18n': {
            language: 'en'
        },
        'router': {
            // defaultModule: 'front'
        }
    },
    metaModels: {
        'base': {
            Class: require('evado-meta-base/base/BaseMeta')
        },
        'navigation': {
            Class: require('evado-meta-navigation/base/NavMeta')
        }
    },
    modules: {
        'api': {
            config: {
                modules: {
                    'base': {
                        Class: require('evado-api-base/Module')
                    },
                    'navigation': {
                        Class: require('evado-api-navigation/Module')
                    }
                }
            }
        },
        'studio': {
            Class: require('evado-module-studio/Module')
        },
        'office': {
            Class: require('evado-module-office/Module')
        },
        'account': {
            Class: require('evado-module-account/Module')
        },
        'admin': {
            Class: require('evado-module-admin/Module')
        },
        'front': {
            Class: require('../module/front/Module')
        }
    },
    users: require('./default-users'),
    userFilters: require('./default-userFilters'),
    security: require('./default-security'),
    notifications: require('./default-notifications'),
    tasks: require('./default-tasks'),
    utilities: require('./default-utilities'),
    eventHandlers: require('./default-eventHandlers'),
    listeners: require('./default-listeners'),
    sideMenu: require('./default-sideMenu'),
    params: {
        'enablePasswordChange': true,
        'enablePasswordReset': false,
        'enableSignUp': false,
        'enableSignUpVerification': false,
        'languageToggle': true
    }
};