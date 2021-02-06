'use strict';

Front.Task = class Task extends Front.Loadable {

    init () {
        super.init();
    }

    getUrl (key = 'read') {
        return super.getUrl(key);
    }

    getPostData () {
        return {
            class: 'task',
            view: 'edit',
            id: this.id
        };
    }

    render (data) {
        const state = data._state;
        this.data = Object.assign({}, data);
        data.project = this.getItemTitle('project', data);
        data.assignee = Jam.FormatHelper.asNotSetOnEmpty(this.getItemTitle('assignee', data));
        data.author = this.getItemTitle('author', data);
        data.priority = this.getItemTitle('priority', data);
        data.state = this.getItemTitle('_state', data);
        data.createdAt = Jam.FormatHelper.asDatetime(data._createdAt);
        data.summary = Front.escapeHtml(data.summary);
        data.description = Front.escapeHtml(data.description);
        data.timeSpent = Jam.FormatHelper.asNotSetOnEmpty(data.timeSpent);
        return this.resolveTemplate('task', data);
    }

    renderItem (data) {
        return this.resolveTemplate('item', {
            id: data.item._id
        });
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    transit (name) {
        this.toggleLoader(true);
        return this.front.ajaxQueue.post(this.getUrl('transit'), {
            class: 'task',
            transition: name,
            id: this.id
        }).done(() => {
            this.toggleLoader(false);
            this.load();
        }).fail(this.onFailAjax.bind(this));
    }

    onFailAjax (data) {
        this.toggleLoader(false);
        this.$content.prepend(this.renderError(data));
    }
};

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

Front.TaskList = class TaskList extends Front.Loadable {

    init () {
        super.init();
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = 6;
        this.on('change:pagination', this.onChangePagination.bind(this));
    }

    getUrl () {
        return super.getUrl('list');
    }

    getPostData () {
        return {
            class: 'task',
            view: 'list',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize(),
            filter: this.getFilter()
        };
    }

    getFilter () {
    }

    onChangePagination (event, {page}) {
        this.load();
    }

    render (data) {
        let items = data?.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.renderItem, this).join('');
        const template = items ? 'list' : 'empty';
        return this.resolveTemplate(template, {items});
    }

    renderItem (data) {
        data.state = this.getItemTitle('_state', data);
        data.priority = this.getItemTitle('priority', data);
        data.project = this.getItemTitle('project', data);
        data.date = Jam.FormatHelper.asDatetime(data._createdAt);
        data.assignee = Jam.FormatHelper.asNotSetOnEmpty(this.getItemTitle('assignee', data));
        data.author = this.getItemTitle('author', data);
        return this.resolveTemplate('item', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }

    onDone (data) {
        super.onDone(data);
        this.pagination.setTotal(data?.totalSize);
        this.$content.append(this.pagination.render());
        Jam.t(this.$container);
    }
};

Front.AssignedTaskList = class AssignedTaskList extends Front.TaskList {

    getPostData () {
        return Object.assign(super.getPostData(), {
            view: 'listAssignedMe'
        });
    }
};

Front.CreatedTaskList = class CreatedTaskList extends Front.TaskList {

    getPostData () {
        return Object.assign(super.getPostData(), {
            view: 'listCreatedMe'
        });
    }
};