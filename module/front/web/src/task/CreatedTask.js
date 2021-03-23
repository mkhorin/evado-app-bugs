/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.CreatedTask = class CreatedTask extends Front.Task {

    init () {
        super.init();
        this.on('click', '[data-command="close"]', this.onClose.bind(this));
        this.on('click', '[data-command="reject"]', this.onReject.bind(this));
        this.on('click', '[data-command="reopen"]', this.onReopen.bind(this));
    }

    render (data) {
        const state = data._state;
        data.close = state === 'done' ? this.resolveTemplate('close') : '';
        data.reopen = state === 'closed' ? this.resolveTemplate('reopen') : '';
        return super.render(data);
    }

    onClose () {
        this.transit('close');
    }

    onReject () {
        Jam.dialog.confirm('Return this task to work?').then(() => this.transit('reject'));
    }

    onReopen () {
        Jam.dialog.confirm('Reopen this task now?').then(() => this.transit('reopen'));
    }
};