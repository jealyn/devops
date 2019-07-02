<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="68px" onsubmit="return false">
            <el-form-item label="项目名称" prop="projectId">
                <el-select
                  v-model="form.projectId"
                  placeholder="请选择项目名称"
                  filterable
                  clearable
                  @change="getVersionList()"
                >
                    <el-option
                      v-for="item in projectList"
                      :key="item.projectId"
                      :label="item.name"
                      :value="item.projectId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="版本号" prop="versionId">
                <el-select
                  v-model="form.versionId"
                  placeholder="请选择版本号"
                  filterable
                  clearable
                    > 
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionCode"
                      :value="item.versionId"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="编译状态" prop="clusterId">
                <el-select
                  v-model="form.buildStatus"
                  placeholder="请选择编译状态"
                  filterable
                  clearable
                >
                    <el-option
                      v-for="item in buildOptions"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                  icon="el-icon-search"
                  size="small"
                  @click="getBuildList(form)"
                >
                    查询
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() { 
        return {
            form: {},
            buildOptions: [
                {
                    status: 'SUCCESS',
                    label: '编译完成',
                },
                {
                    status: 'FAILED',
                    label: '编译失败',
                },
                {
                    status: 'RUNNING',
                    label: '编译中',
                },
            ]
        };
    },
    created() {
        this.getProjectListReq({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapGetters({
            projectList: 'projectModule/filterProjectList',
            versionList: 'versionModule/filterVersionList',
        }),
    },
    methods: {
        ...mapActions({
            getProjectListReq: 'projectModule/getProjectList',
            getVersionListReq: 'versionModule/getVersionList',
            getBuildListReq: 'buildModule/getBuildList',
        }),
        getVersionList() {
            const payload = {
                projectId: this.form.projectId,
                currentPage: 1,
                pageSize: 1000 
            };
            this.getVersionListReq(payload);
        },
        getBuildList(form) {
            const query = this.$formatSearchData(this.form);
            this.getBuildListReq(query);
            this.$router.replace( { query });
        }
    },
};
</script>
