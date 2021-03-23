/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
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