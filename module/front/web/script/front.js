'use strict';

Vue.mixin({
    data () {
        return {
            loading: false
        };
    },
    computed: {
        isGuest () {
            return !this.$root.userId;
        },
        isExecutor () {
            return this.$root.executor === 'true';
        },
        isManager () {
            return this.$root.manager === 'true';
        }
    },
    mounted () {
        this.translateElement();
    },
    updated () {
        this.translateElement();
    },
    methods: {
        isMan () {
            return this.$root.manager;
        },
        getDataUrl (action) {
            return `${this.$root.dataUrl}/${action}`;
        },
        getThumbnailUrl (id, size = 'sm') {
            return `${this.$root.thumbnailUrl}&s=${size}&id=${id}`;
        },
        getRefArray (name) {
            const data = this.$refs[name];
            return Array.isArray(data) ? data : data ? [data] : [];
        },
        getValueTitle (key, data) {
            const item = data[key];
            if (item?.hasOwnProperty('_title')) {
                return item._title;
            }
            return data.hasOwnProperty(`${key}_title`) ? data[`${key}_title`] : item;
        },
        fetchJson () {
            return this.fetchByMethod('getJson', ...arguments);
        },
        fetchText (url, data) {
            return this.fetchByMethod('getText', ...arguments);
        },
        fetchByMethod (name, action, data) {
            try {
                const csrf = this.$root.csrf;
                this.loading = true;
                return (new Jam.Fetch)[name](this.getDataUrl(action), {csrf, ...data});
            } finally {
                this.loading = false;
            }
        },
        requireAuth () {
            if (this.isGuest()) {
                location.assign(this.$root.authUrl);
                return false;
            }
            return true;
        },
        toMain () {
            this.$root.$emit('main');
        },
        toAssignedTasks () {
            this.$root.$emit('assigned-tasks');
        },
        toCreatedTasks () {
            this.$root.$emit('created-tasks');
        },
        translateElement () {
            Jam.i18n.translate($(this.$el));
        },
        showError () {
            Jam.dialog.error(...arguments);
        }
    }
});

const front = new Vue({
    el: '#front',
    props: {
        csrf: String,
        authUrl: String,
        dataUrl: String,
        thumbnailUrl: String,
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