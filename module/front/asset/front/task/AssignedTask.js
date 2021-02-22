/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.AssignedTask = class AssignedTask extends Front.Task {

    init () {
        super.init();
        this.on('click', '[data-command="start"]', this.onStart.bind(this));
        this.on('click', '[data-command="stop"]', this.onStop.bind(this));
        this.on('click', '[data-command="complete"]', this.onComplete.bind(this));
    }

    render (data) {
        const state = data._state;
        data.start = state === 'new' || state === 'done' ? this.resolveTemplate('start') : '';
        data.stop = state === 'inProgress' ? this.resolveTemplate('stop') : '';
        return super.render(data);
    }

    onStart () {
        this.transit('start');
    }

    onStop () {
        this.transit('stop');
    }

    onComplete () {
        this.transit('complete');
    }
};