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
        roles: 'employee',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'all'
        }
    }, {
        description: 'Can create comments, documents and works',
        roles: 'employee',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: ['comment', 'document', 'work']
        }
    }, {
        description: 'Manage own data',
        roles: 'employee',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: ['task', 'comment', 'work']
        },
        rules: 'author'
    }, {
        description: 'Manage own documents',
        roles: 'employee',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: 'document'
        },
        rules: 'creator'
    }, {
        description: 'Default employee cannot change task states',
        roles: 'employee',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        }
    }, {
        description: 'Manager can create tasks',
        roles: 'manager',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'class',
            class: 'task'
        }
    }, {
        description: 'Manager can change states of its own tasks',
        roles: 'manager',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        },
        rules: 'author'
    }, {
        description: 'Executor can change states of tasks assigned to him',
        roles: 'executor',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task'
        },
        rules: 'assignee'
    }, {
        description: 'Manager cannot start, stop and complete tasks',
        roles: 'manager',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task',
            transition: ['start', 'stop', 'complete']
        }
    }, {
        description: 'Executor cannot reject, close and reopen tasks',
        roles: 'executor',
        type: 'deny',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'task',
            transition: ['reject', 'close', 'reopen']
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
        'manager': {
            label: 'Manager',
            description: 'Manager creates, assigns and reviews tasks'
        },
        'employee': {
            label: 'Employee',
            description: 'Team employee',
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
                userAttr: '_creator'
            }
        },
        'assignee': {
            label: 'Assignee',
            description: 'Assignee checking via user binding to related object',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'assignee'
            }
        },
        'author': {
            label: 'Author',
            description: 'Author checking via user binding to related object',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'author'
            }
        },
        'user': {
            label: 'User',
            description: 'Check user binding',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule'
            }
        }
    },

    // bind users to roles
    assignments: {
        'Adam': 'administrator',
        'Bob': ['executor', 'employee'],
        'Denis': ['executor', 'employee'],
        'Sara': ['manager', 'employee'],
        'Tim': ['manager', 'employee']
    },

    // rules to auto-bind users to roles
    assignmentRules: {        
    }
};