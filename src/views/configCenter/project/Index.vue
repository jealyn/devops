<template>
    <div>
        <Search></Search>
        <List></List>
        <Modal></Modal>
        <ClusterModal></ClusterModal>
        <GroupModal></GroupModal>
        <JenkinsModal></JenkinsModal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Search from './Search.vue';
import List from './List.vue';
import Modal from './Modal.vue';
import ClusterModal from './ClusterModal.vue';
import GroupModal from './GroupModal.vue';
import JenkinsModal from './JenkinsModal.vue';

export default {
    components: {
        Search,
        List,
        Modal,
        ClusterModal,
        GroupModal,
        JenkinsModal
    },
    created() {
        this.getProjectList();
        this.getResoucesReq();
        this.getModListReq({ pageSize: 1000, currentPage: 1 });
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getListReq: 'projectModule/getProjectList',
            getResoucesReq: 'projectModule/getResouces',
            getModListReq: 'modModule/getModList'
        }),
        getProjectList() {
            this.getListReq(this.query);
        },
    },
    watch: {
        query() {
            this.getProjectList();
        }
    }
};
</script>