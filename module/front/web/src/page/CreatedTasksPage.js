/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.CreatedTasksPage = class CreatedTasksPage extends Front.Page {

    init () {
        super.init();
        this.list = this.getHandler('CreatedTaskList');
        this.front.on('action:createdTasks', this.onCreatedTasks.bind(this));
    }

    activate () {
        super.activate();
        this.list.load();
    }

    onCreatedTasks () {
        this.showPage();
    }
};