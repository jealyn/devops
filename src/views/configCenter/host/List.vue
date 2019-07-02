<template>
    <div v-loading="$isShowLoading('hostList')">
        <el-table :data="hostList" border :row-class-name="rowClassName">
            <el-table-column label="主机名" prop="name"></el-table-column>
            <el-table-column label="host name" prop="hostname" min-width="100px"></el-table-column>
            <el-table-column label="minionId" prop="minionId" min-width="100px"></el-table-column>
            <el-table-column label="ip地址" prop="privateIp">
                <template slot-scope="scope">内网:
                    <a>{{ scope.row.privateIp }}</a>
                    <br>
                    公网：<a>{{ scope.row.publicIp }}</a>
                </template>
            </el-table-column>
            <el-table-column label="是否在线" prop="online">
                <template slot-scope="scope">
                    {{scope.row.online ? '是' : '否'}}
                </template>
            </el-table-column>
            <el-table-column label="云平台" prop="platformId"></el-table-column>
            <el-table-column label="说明" prop="description"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small"  @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" @click="handleCheckIn(scope.row)">在线检测</el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(['loading', 'btnLoading', 'hostModule']),
        ...mapGetters({
            hostList: 'hostModule/filterHostList',
            pagination: 'hostModule/pagination'
        })
    },
    methods: {
        ...mapActions({
            getDetail: 'hostModule/getHostDetail',
            getCheckIn: 'hostModule/getCheckIn'
        }),
        handleEdit(data) {
            this.getDetail(data);
            this.$showModal('updateHost');
        },
        getNodeList() {
            const params = { ...this.$route.query };
            this.getNodeListReq(params);
        },
        getGroupList() {
            this.getGroupListReq({ ...this.$route.query });
        },
        handleCheckIn(data) {
            this.getCheckIn(data.hostId);
        },
        rowClassName({ row }) {
            if (row.rid <= 0) {
                return 'hidden';
            }
        }
    }
};
</script>
