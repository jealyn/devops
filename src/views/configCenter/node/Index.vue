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
import { mapActions } from 'vuex';

export default {
    components: {
        List,
        Modal,
        Search
    },
    created() {
        this.getNodeList();
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getNodeListReq: 'saltNodeModule/getSaltNodeList'
        }),
        getNodeList() {
            this.getNodeListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getNodeList();
        }
    }
};
</script>