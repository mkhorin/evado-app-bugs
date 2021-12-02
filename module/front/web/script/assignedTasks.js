'use strict';

Vue.component('assigned-tasks', {
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
        onTask (event) {
            this.$root.$emit('assigned-task', event.currentTarget.dataset.id);
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'task',
                view: 'listAssignedMe',
                length: this.pageSize,
                start: page * this.pageSize
            });
            const pageSize = this.pageSize;
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
                summary: item.summary
            }));
        },
    },
    template: '#assigned-tasks'
});