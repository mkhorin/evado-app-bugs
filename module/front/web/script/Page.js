'use strict';

Front.Page = class Page extends Front.Element {

    init () {
        this.name = this.getData('page');
        this.front.on('show:page', this.onPage.bind(this));
    }

    onPage (event, data) {
        if (this.name === data.name) {
            this.activate(data);
        }
    }

    activate () {
        this.front.togglePage(this.name);
    }

    showPage () {
        this.front.showPage(this.name, ...arguments);
    }
};

Front.MainPage = class MainPage extends Front.Page {
};

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