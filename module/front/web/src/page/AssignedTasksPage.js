/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.AssignedTasksPage = class AssignedTasksPage extends Front.Page {

    init () {
        super.init();
        this.list = this.getHandler('AssignedTaskList');
        this.front.on('action:assignedTasks', this.onAssignedTasks.bind(this));
    }

    activate () {
        super.activate();
        this.list.load();
    }

    onAssignedTasks () {
        this.showPage();
    }
};