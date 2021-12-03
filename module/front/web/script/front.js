'use strict';

const front = new Vue({
    el: '#front',
    props: {
        csrf: String,
        authUrl: String,
        dataUrl: String,
        userId: String,
        executor: String,
        manager: String
    },
    propsData: {
        ...document.querySelector('#front').dataset
    },
    data () {
        return {
            activePage: 'main-page',
            activeTask: null
        };
    },
    computed: {
        activePageProps () {
            switch (this.activePage) {
                case 'created-task': return {
                    task: this.activeTask
                };
                case 'assigned-task': return {
                    task: this.activeTask
                };
            }
        }
    },
    created () {
        this.$on('main', this.onMain);
        this.$on('created-tasks', this.onCreatedTasks);
        this.$on('created-task', this.onCreatedTask);
        this.$on('assigned-tasks', this.onAssignedTasks);
        this.$on('assigned-task', this.onAssignedTask);
    },
    methods: {
        onMain () {
            this.activePage = 'main-page';
        },
        onCreatedTasks () {
            this.activePage = 'created-tasks';
        },
        onCreatedTask (id) {
            this.activePage = 'created-task';
            this.activeTask = id;
        },
        onAssignedTasks () {
            this.activePage = 'assigned-tasks';
        },
        onAssignedTask (id) {
            this.activePage = 'assigned-task';
            this.activeTask = id;
        }
    }
});