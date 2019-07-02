<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="54px" onsubmit="return false">
            <el-form-item label="节点" prop="saltNodeId">
                <el-select
                    v-model="form.saltNodeId"
                    placeholder="请选择节点"
                    filterable
                    clearable
                >
                    <el-option
                        v-for="item in saltNodeList"
                        :key="item.saltNodeId" 
                        :label="item.name"
                        :value="item.saltNodeId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板" prop="saltModId">
                <el-select
                    v-model="form.saltModId"
                    placeholder="请选择脚本模板"
                    filterable
                    clearable
                >
                    <el-option
                        v-for="item in modList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名" prop="projectId">
                <el-select
                    v-model="form.projectId"
                    placeholder="请选择项目"
                    filterable
                    clearable
                    @change="getVersionList()"
                >
                    <el-option
                        v-for="item in projectList"
                        :key="item.projectId"
                        :label="item.name"
                        :value="item.projectId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本号" prop="versionId">
                <el-select
                    v-model="form.versionId"
                    placeholder="请选择一个版本"
                    filterable
                    clearable
                >
                    <el-option
                        v-for="item in versionList"
                        :key="item.versionId"
                        :label="item.versionCode"
                        :value="item.versionId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select
                    v-model="form.status"
                    placeholder="请选择部署状态"
                    clearable
                    filterable
                >
                    <el-option 
                        v-for="item in deployOptions"
                        :key="item.status"
                        :label="item.label"
                        :value="item.status">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    style="margin-left:16px"
                    icon="el-icon-search"
                    size="small"
                    @click="getDeployList(form)"
                >查询</el-button>
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
            deployOptions: [
                {
                    status: 'SUCCESS',
                    label: '部署成功',
                },
                {
                    status: 'FAILED',
                    label: '部署失败',
                },
                {
                    status: 'WAITING',
                    label: '等待部署',
                },
                {
                    status: 'RUNNING',
                    label: '部署中',
                },
            ]
        };
    },
    created() {
        this.getProjectListReq({ currentPage: 1, pageSize: 1000 });
        this.getModListReq({ currentPage: 1, pageSize: 1000 });
        this.getSaltNodeListReq({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapGetters({
            deployTaskList: 'deployModule/filterDeployList',
            projectList: 'projectModule/filterProjectList',
            versionList: 'versionModule/filterVersionList',
            saltNodeList: 'saltNodeModule/filterSaltNodeList',
            modList: 'modModule/filterModList'
        }),
    },
    methods: {
        ...mapActions({
            getProjectListReq: 'projectModule/getProjectList',
            getVersionListReq: 'versionModule/getVersionList',
            getDeployListReq: 'deployModule/getDeployList',
            getSaltNodeListReq: 'saltNodeModule/getSaltNodeList',
            getModListReq: 'modModule/getModList'
        }),
        getVersionList() {
            const payload = {
                projectId: this.form.projectId,
                currentPage: 1, 
                pageSize: 1000
            };
            this.getVersionListReq(payload);
        },
        getDeployList(form) {
            const query = this.$formatSearchData(this.form);
            this.getDeployListReq(query);
            this.$router.replace( { query });
        }
    }
};
</script>
