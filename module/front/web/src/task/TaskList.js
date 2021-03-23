/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
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