<template>
    <div>
        <search></search>
        <list></list>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import List from './List.vue';
import Search from './Search.vue';

export default {
    components: {
        List,
        Search,
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
    created() {
        this.getBuildList();
    },

    methods: {
        ...mapActions({
            getBuildListReq: 'buildModule/getBuildList',
        }),
        getBuildList() {
            this.getBuildListReq(this.query);
        },
    },
    watch: {
        query() {
            this.getBuildList();
        }
    }
};
</script>
