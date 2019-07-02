<template>
    <div>
        <Search></Search>
        <List></List>
        <Modal></Modal>
        <ecs-modal></ecs-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Search from './Search.vue';
import List from './List.vue';
import Modal from './Modal.vue';
import EcsModal from './EcsModal.vue';

export default {
    components: {
        Search,
        List,
        Modal,
        EcsModal
    },
    created() {
        this.getHostList();
    },
    computed: {
        query() {
           return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getListReq: 'hostModule/getHostList'
        }),
        getHostList() {
            this.getListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getHostList();
        }
    }
};
</script>