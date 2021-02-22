/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.CreatedTaskPage = class CreatedTaskPage extends Front.Page {

    init () {
        super.init();
        this.task = this.getHandler('CreatedTask');
        this.front.on('action:createdTask', this.onCreatedTask.bind(this));
    }

    activate (data) {
        super.activate();
        this.task.setInstance(data.task);
    }

    onCreatedTask (event, data) {
        this.showPage(data);
    }
};