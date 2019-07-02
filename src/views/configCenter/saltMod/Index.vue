<template>
    <div>
        <Search></Search>
        <List></List>
        <Modal></Modal>
    </div>
</template>

<script>
import List from './List.vue';
import Modal from './Modal.vue';
import Search from './Search.vue';

import { mapActions } from 'vuex';

export default {
    components: {
        Search,
        List,
        Modal,
    },
    created() {
        this.getModList();
        this.getModSelectReq();
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getModListReq: 'modModule/getModList',
            getModSelectReq: 'modModule/getModSelect'
        }),
        getModList() {
            this.getModListReq(this.query);
        }
    },
    watch: {
        query() {
            this.getModList();
        }
    }
};
</script>