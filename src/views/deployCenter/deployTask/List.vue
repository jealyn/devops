<template>
    <div v-loading="$isShowLoading('deployList')">
        <el-table :data="deployList" border>
            <el-table-column label="项目名称" prop="project.name">
            </el-table-column>
            <el-table-column label="版本号" prop="version.versionCode">
            </el-table-column>
            <el-table-column label="主机" prop="minionId">
            </el-table-column>
            <el-table-column label="JID" prop="jobId">
                <template slot-scope="scope">
                    <a @click="showJidDetail(scope.row)">{{ scope.row.jobId }}</a>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-button 
                      v-if="scope.row.status === 'RUNNING'"
                      :loading="true"
                      type="text">部署中
                    </el-button>
                    <el-tag 
                      v-if="scope.row.status === 'FAILED'"
                      type="danger">部署失败
                    </el-tag>
                    <el-tag 
                      v-if="scope.row.status === 'SUCCESS'"
                      type="success">部署成功
                    </el-tag>
                    <el-tag 
                      v-if="scope.row.status === 'WAITING'"
                      type="info">等待部署
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button 
                      type="primary"
                      size="mini"
                      v-if="scope.row.status !== 'SUCCESS' && scope.row.status !== 'FAILED'"
                      plain
                      :loading="$isShowLoading('deployList')"
                      @click="handleUpdate(scope.row)">更新
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            deployList: 'deployModule/filterDeployList',
            pagination: 'deployModule/pagination',
        }),
    },
    methods: {
        ...mapActions({
            updateJobStatusReq: 'deployModule/updateJobStatus',
            getDeployListReq: 'deployModule/getDeployList',
            getJiDetailReq: 'deployModule/getJidDetail'
        }),
        showJidDetail(data) {
            this.getJiDetailReq(data);
            this.$showModal('jobIdDetail');
        },
        handleUpdate(data) {
            const param = {
                jobId: data.jobId,
            };
            this.updateJobStatusReq(param);
        },
    }
};
</script>

