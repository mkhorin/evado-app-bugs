'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Full access to data',
        roles: 'administrator',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'all'
        }
    }, {
        description: 'Can read all data',
        roles: 'member',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'all'
        }
    }, {
        description: 'Can create entities',
        roles: 'member',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: ['comment', 'document', 'work']
        }
    }, {
        description: 'Can create task',
        roles: 'producer',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: 'task'
        }
    }, {
        description: 'Manage own data',
        roles: 'member',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: ['task', 'comment', 'work']
        },
        rule: 'author'
    }, {
        description: 'Manage own document',
        roles: 'member',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: 'document'
        },
        rule: 'creator'
    }, {
        description: 'Default member cannot change task states',
        roles: 'member',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        }
    }, {
        description: 'Producer can change states of its own tasks',
        roles: 'producer',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        },
        rule: 'author'
    }, {
        description: 'Executor can change states of tasks assigned to him',
        roles: 'executor',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        },
        rule: 'assignee'
    }, {
        description: 'Producer cannot start, stop and complete tasks',
        roles: 'producer',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task',
            transition: ['start', 'stop', 'complete']
        }
    }, {
        description: 'Executor cannot refuse, close and reopen tasks',
        roles: 'executor',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task',
            transition: ['refuse', 'close', 'reopen']
        }
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Administration module',
            description: 'Access to Administration module'
        },
        'moduleOffice': {
            label: 'Office module',
            description: 'Access to Office module'
        },
        'moduleStudio': {
            label: 'Studio module',
            description: 'Access to Studio module'
        },
        'moduleApiBaseUpload': {
            label: 'Upload files',
            description: 'Uploading files via basic metadata API module'
        }
    },

    roles: {
        'administrator': {
            label: 'Administrator',
            description: 'Full access to all',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Guest',
            description: 'Auto-assigned role for anonymous users'
        },
        'executor': {
            label: 'Executor',
            description: 'Executor is appointed to solve tasks'
        },
        'producer': {
            label: 'Producer',
            description: 'Producer creates, assigns and reviews tasks'
        },
        'member': {
            label: 'Member',
            description: 'Team member',
            children: [
                'moduleOffice',
                'moduleApiBaseUpload'
            ]
        }
    },

    rules: {
        'creator': {
            label: 'Creator',
            description: 'Check user binding as object creator',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                attr: '_creator'
            }
        },
        'assignee': {
            label: 'Assignee',
            description: 'Assignee checking via user binding to related object',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                attr: 'assignee'
            }
        },
        'author': {
            label: 'Author',
            description: 'Author checking via user binding to related object',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                attr: 'author'
            }
        },
        'user': {
            label: 'User',
            description: 'Check user binding',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                attr: 'user'
            }
        }
    },

    // bind users to roles
    assignments: {
        'Adam': 'administrator',
        'Bob': ['executor', 'member'],
        'Denis': ['executor', 'member'],
        'Sara': ['producer', 'member'],
        'Tim': ['producer', 'member']
    },

    // rules to auto-bind users to roles
    assignmentRules: {        
    }
};