'use strict';

module.exports = {

    'doneTask': {
        active: true,
        subject: 'doneTask.subject',
        text: 'doneTask.text',
        methods: 'popup',
        recipient: {
            Class: 'component/notifier/UserRecipient',
            userAttr: 'author.user'
        }
    }
};