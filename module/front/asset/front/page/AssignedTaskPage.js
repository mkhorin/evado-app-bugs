/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Front.AssignedTaskPage = class AssignedTaskPage extends Front.Page {

    init () {
        super.init();
        this.task = this.getHandler('AssignedTask');
        this.front.on('action:assignedTask', this.onAssignedTask.bind(this));
    }

    activate (data) {
        super.activate();
        this.task.setInstance(data.task);
    }

    onAssignedTask (event, data) {
        this.showPage(data);
    }
};