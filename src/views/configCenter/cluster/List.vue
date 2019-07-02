<template>
    <div v-loading="$isShowLoading('clusterList')">
        <el-table :data="clusterList" border>
            <el-table-column prop="clusterId" label="集群ID"></el-table-column>
            <el-table-column prop="business" label="业务名称"></el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            clusterList: 'clusterModule/filterClusterList',
            pagination: 'clusterModule/pagination'
        })
    },
    methods: {
        ...mapActions({
            getClusterDetailReq: 'clusterModule/getClusterDetail'
        }),
        handleEdit(data) {
            this.$showModal('updateCluster');
            this.getClusterDetailReq(data);
        }
    }
};
</script>
