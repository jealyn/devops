<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="80px" onsubmit="return false">
            <el-form-item label="项目名称">
                <el-input v-model="form.name" placeholder="请输入项目名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目ID">
                <el-input v-model="form.projectId" placeholder="请输入项目ID" clearable></el-input>
            </el-form-item>
            <el-form-item label="业务集群" prop="clusterId">
                <el-select v-model="form.clusterId" placeholder="请选择业务集群" clearable filterable>
                    <el-option
                      v-for="item in filterClusterList"
                      :key="item.clusterId"
                      :label="item.business"
                      :value="item.clusterId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="el-icon-circle-plus-outline" size="small" @click="$showModal('addProject')">添加</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            form: {}
        };
    },
    created() {
        this.getClusterList({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapGetters({
            filterClusterList: 'clusterModule/filterClusterList'
        }),
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            projectList: 'projectModule/getProjectList',
            getClusterList: 'clusterModule/getClusterList'
        }),
        getList(form) {
            const query = this.$formatSearchData(this.form);
            this.projectList(query);
            this.$router.replace( { query });
        },
    },
};
</script>