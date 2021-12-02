'use strict';

Vue.component('main-page', {
    computed: {

    },
    methods: {
        onAssignedTasks () {
            this.$root.$emit('assigned-tasks');
        },
        onCreatedTasks () {
            this.$root.$emit('created-tasks');
        }
    },
    template: '#main-page'
});