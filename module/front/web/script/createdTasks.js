'use strict';

Vue.component('created-tasks', {
    props: {
        pageSize: {
            type: Number,
            default: 6
        }
    },
    data () {
        return {
            items: []
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        onTask (id) {
            this.$root.$emit('created-task', id);
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const {pageSize} = this;
            const data = await this.fetchJson('list', {
                class: 'task',
                view: 'listCreatedMe',
                length: pageSize,
                start: page * pageSize
            });
            this.$emit('load', {...data, pageSize, page});
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                state: this.getValueTitle('_state', item),
                priority: this.getValueTitle('priority', item),
                project: this.getValueTitle('project', item),
                summary: item.summary,
                date: Jam.FormatHelper.asDatetime(item._createdAt),
                assignee: Jam.FormatHelper.asNotSetOnEmpty(this.getValueTitle('assignee', item)),
                author: this.getValueTitle('author', item)
            }));
        },
    },
    template: '#created-tasks'
});