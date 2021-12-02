'use strict';

Vue.component('assigned-task', {
    props: {
        task: String
    },
    data () {
        return {
            id: null,
            project: null,
            assignee: null,
            author: null,
            priority: null,
            state: null,
            stateTitle: null,
            createdAt: null,
            summary: null,
            description: null,
            timeSpent: null
        };
    },
    computed: {
        isDone () {
            return this.state === 'done';
        },
        isNew () {
            return this.state === 'new';
        },
        isInProgress () {
            return this.state === 'inProgress';
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        async onStart () {
            await this.transit('start');
        },
        async onStop () {
            await this.transit('stop');
        },
        async onComplete () {
            await this.transit('complete');
        },
        async transit (transition) {
            try {
                await this.fetchText('transit', {
                    class: 'task',
                    id: this.task,
                    transition
                });
                await this.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        async reload () {
            await this.load(this.task);
        },
        async load (id) {
            const data = await this.fetchJson('read', {
                class: 'task',
                view: 'edit',
                id
            });
            this.$emit('load', data);
        },
        onLoad (data) {
            this.id = data._id;
            this.project = this.getValueTitle('project', data);
            this.assignee = Jam.FormatHelper.asNotSetOnEmpty(this.getValueTitle('assignee', data));
            this.author = this.getValueTitle('author', data);
            this.priority = this.getValueTitle('priority', data);
            this.state = data._state;
            this.stateTitle = Jam.t(this.getValueTitle('_state', data), 'meta');
            this.createdAt = Jam.FormatHelper.asDatetime(data._createdAt);
            this.summary = data.summary;
            this.description = data.description;
            this.timeSpent = Jam.FormatHelper.asNotSetOnEmpty(data.timeSpent);
        }
    },
    template: '#assigned-task'
});