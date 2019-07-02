<template>
    <div>
        <search></search>
        <list></list>
        <AddModal></AddModal>
    </div>
</template>

<script>
import List from './List.vue';
import AddModal from './AddModal.vue';
import Search from './Search.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Search,
        List,
        AddModal
    },
    created() {
        this.getConfigList();
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getListReq: 'apolloModule/getApolloList',
        }),
        getConfigList() {
            this.getListReq(this.query);
        }
    },
    watch: {
        query() {
           this.getConfigList(); 
        }
    }
};
</script>