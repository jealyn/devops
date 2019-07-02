<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" label-width="80px" :model="form" onsubmit="return false">
            <el-form-item label="节点ID">
                <el-input v-model.trim="form.saltNodeId" placeholder="请输入节点ID" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                  type="info"
                  icon="el-icon-circle-plus-outline"
                  size="small"
                  @click="$showModal('addSaltNode')"
                >新建</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            form: {}
        };
    },
    methods: {
        ...mapActions({
            getSaltNodeListReq: 'saltNodeModule/getSaltNodeList'
        }),
        getList() {
            const query = this.$formatSearchData(this.form);
            this.getSaltNodeListReq(query);
            this.$router.replace( { query });
        }
    }
};
</script>