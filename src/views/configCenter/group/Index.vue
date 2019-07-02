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
        this.getGroupList();
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getGroupListReq: 'groupModule/getGroupList'
        }),
        getGroupList() {
            this.getGroupListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getGroupList();
        }
    }
};
</script>