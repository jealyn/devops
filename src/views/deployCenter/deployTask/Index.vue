<template>
    <div>
        <search></search>
        <list></list>
        <modal></modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import List from './List.vue';
import Modal from './Modal.vue';
import Search from './Search.vue';

export default {
    components: {
        List,
        Modal,
        Search,
    },
    created() {
        this.getDeployList();
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
    methods: {
        ...mapActions({
            getDeployListReq: 'deployModule/getDeployList',
        }),
        getDeployList() {
            this.getDeployListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getDeployList();
        }
    },
};
</script>

