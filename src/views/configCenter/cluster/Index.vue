<template>
    <div>
        <search></search>
        <list></list>
        <modal></modal>
    </div>
</template>

<script>
import List from './List.vue';
import Modal from './Modal.vue';
import Search from './Search.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        List,
        Modal, 
        Search
    },
    created() {
        this.getClusterList();
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getListReq: 'clusterModule/getClusterList',
        }),
        getClusterList() {
            this.getListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getClusterList();
        }
    }
};
</script>