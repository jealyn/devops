<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="68px" onsubmit="return false">
            <el-form-item label="版本号" prop="versionCode">
                <el-input
                  v-model.trim="form.versionCode"
                  placeholder="请输入版本号"
                  clearable>
                </el-input>
            </el-form-item>
            <el-form-item
              prop="projectId"
              label="项目名称">
                <el-select
                  v-model="form.projectId"
                  placeholder="请选择项目名称"
                  filterable
                  clearable
                  @change="getProjectDetail(form.projectId)"
                  >
                    <el-option
                      v-for="item in projectList"
                      :key="item.projectId"
                      :label="item.name"
                      :value="item.projectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
              prop="buildStatus"
              label="编译状态">
                <el-select
                  v-model="form.buildStatus"
                  placeholder="请选择编译状态"
                  clearable
                  filterable
                >
                    <el-option
                      v-for="item in buildOptions"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
              prop="deployStatus"
              label="部署状态"
            >
                <el-select
                  v-model="form.deployStatus"
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
            <el-form-item
              prop="approveStatus"
              label="审核状态"
            >
                <el-select
                  v-model="form.approveStatus"
                  placeholder="请选择审核状态"
                  clearable
                  filterable
                >
                    <el-option
                      v-for="item in approveOptions"
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
                  @click="getVersionList(form)">
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
            ],
            buildOptions: [
                {
                    status: 'SUCCESS',
                    label: '编译成功',
                },
                {
                    status: 'FAILED',
                    label: '编译失败',
                },
                {
                    status: 'RUNNING',
                    label: '编译中',
                },
            ],
            approveOptions: [
                {
                    status: 'ALLOW',
                    label: '审核通过',
                },
                {
                    status: 'DENY',
                    label: '审核未过',
                },
                {
                    status: 'UNDER_REVIEW',
                    label: '审核中',
                },
                {
                    status: 'IGNORE',
                    label: '无需审核',
                },
            ]
        };
    },
    computed: {
        ...mapGetters({
            projectList: 'projectModule/filterProjectList',
            projectDetail: 'projectModule/filterProjectDetail',
        }),
    },
    created() {
        this.getProjectList();
    },
    methods: {
        ...mapActions({
            getProjectListReq: 'projectModule/getProjectList',
            getProjectDetailReq: 'projectModule/getProjectDetail',
            getVersionDetailReq: 'versionModule/getVersionList',
        }),
        getProjectList() {
            this.getProjectListReq({ pageSize: 1000 });
        },
        getProjectDetail(id) {
            if (id !== '') {
                const project = {
                    projectId: id,
                };
                this.getProjectDetailReq(project);
            }
        },
        getVersionList(form) {
            const query = this.$formatSearchData(this.form);
            this.getVersionDetailReq(query);
            this.$router.replace( { query });
        },
       
    },
    watch: {
        
    }
};
</script>
