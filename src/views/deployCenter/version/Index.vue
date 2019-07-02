<template>
    <div>
        <search></search>
        <list></list>
        <deploymodal></deploymodal>
        <status-modal></status-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Search from './Search.vue';
import List from './List.vue';
import StatusModal from './StatusModal.vue';
import deploymodal from './DeployModal.vue';

export default {
    data() {
        return {

        };
    },
    components: {
        List,
        Search,
        StatusModal,
        deploymodal
    },
    computed: {
        ...mapGetters({
            versionList: 'versionModule/filterVersionList',
        }),
        query() {
            return this.$route.query;
        }
    },
    created() {
        this.getVersionList();
    },
    methods: {
        ...mapActions({
            getListReq: 'versionModule/getVersionList' 
        }),
        getVersionList() {
            this.getListReq(this.query);
        },
    }
};
</script>
