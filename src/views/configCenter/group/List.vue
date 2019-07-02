<template>
    <div v-loading="$isShowLoading('groupList')">
        <el-table :data="groupList" border>
            <el-table-column prop="name" label="分组名称"></el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
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
            groupList: 'groupModule/filterGroupList',
            pagination: 'groupModule/pagination'
        })
    },
    methods: {
        ...mapActions({
            getGroupDetailReq: 'groupModule/getgroupDetail'
        }),
        handleEdit(data) {
            this.$showModal('updateGroup');
            this.getGroupDetailReq(data);
        }
    }
};
</script>