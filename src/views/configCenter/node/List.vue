<template>
    <div v-loading="$isShowLoading('nodeList')">
        <el-table :data="nodeList" border>
            <el-table-column prop="name" label="节点名称"></el-table-column>
            <el-table-column prop="platformId" label="云平台"></el-table-column>
            <el-table-column prop="baseUrl" label="baseUrl"></el-table-column>
            <el-table-column prop="authType" label="授权类型"></el-table-column>
            <!-- <el-table-column prop="user" label="用户名"></el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
            nodeList: 'saltNodeModule/filterSaltNodeList',
            pagination: 'saltNodeModule/pagination'
        })
    }, 
    methods: {
        ...mapActions({
            getSaltNodeDetailReq: 'saltNodeModule/getSaltNodeDetail'
        }),
        handleEdit(data) {
            this.$showModal('updateSaltNode');
            this.getSaltNodeDetailReq(data);
        }
    }
};
</script>