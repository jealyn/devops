<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="80px" onsubmit="return false">
            <el-form-item label="configId">
                <el-input v-model.trim="form.configId" placeholder="请输入configId" clearable></el-input>
            </el-form-item>
            <el-form-item label="配置名称">
                <el-input v-model.trim="form.name" placeholder="请输入配置名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="el-icon-circle-plus-outline" size="small" @click="handleAdd()">添加</el-button>
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
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            getListReq: 'apolloModule/getApolloList',
        }),
        getList(form) {
            const query = this.$formatSearchData(this.form);
            this.getListReq(query);
            this.$router.replace( { query });
        },
        handleAdd() {
            this.$showModal('addApollo');
        }
    },
};
</script>