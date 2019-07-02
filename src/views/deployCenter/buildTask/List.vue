<template>
    <div v-loading="$isShowLoading('buildList')">
        <el-table :data="buildList" border>
            <el-table-column label="项目名称" prop="project.name">
            </el-table-column>
            <el-table-column label="版本号" prop="version.versionCode">
            </el-table-column>
            <el-table-column label="任务ID" prop="buildId">
                <template slot-scope="scope">
                    <a :href='scope.row.project.jenkinsUrl + `${scope.row.buildId}`' target="blank">{{ scope.row.buildId }}</a>
                </template>
            </el-table-column>
            <el-table-column
              label="编译状态"
              prop="buildStatus"
            >
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.buildStatus === 'SUCCESS'" type="success">编译完成
                    </el-tag>
                    <el-tag
                        v-if="scope.row.buildStatus === 'FAILED'" type="danger">
                        编译失败
                    </el-tag>
                    <el-button
                        v-if="scope.row.buildStatus === 'RUNNING'" type="text" :loading="true">编译中
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" plain
                      size="mini"
                      :loading="$isShowLoading('buildList')"
                      @click="handleFresh(scope.row)"
                      v-if="scope.row.buildStatus === 'RUNNING' || scope.row.buildStatus === 'SUCCESS'"
                    >
                        更新
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>    
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
        };
    },
    created() {
    },
    computed: {
        ...mapGetters({
            buildList: 'buildModule/filterBuildList',
            pagination: 'buildModule/pagination',
        }),
    },
    methods: {
        ...mapActions({
            freshBuildStatusReq: 'buildModule/freshBuildStatus'
        }),
        handleFresh(data) {
            this.freshBuildStatusReq(data);
        }
    },
};
</script>

