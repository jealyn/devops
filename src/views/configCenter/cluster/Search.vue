<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" label-width="80px" :model="form" onsubmit="return false">
            <el-form-item label="集群ID">
                <el-input v-model.trim="form.clusterId" placeholder="请输入集群ID" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="el-icon-circle-plus-outline" size="small" @click="$showModal('addCluster')">添加</el-button>
            </el-form-item>
        </el-form>
    </el-card> 
</template>  

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        const { clusterId = '' } = this.$route.query;
        return {
            form: {
                
            }
        };
    },
    methods: {
        ...mapActions({
            getClusterListReq: 'clusterModule/getClusterList'
        }),
        getList() {
            const query = this.$formatSearchData(this.form);
            this.getClusterListReq(query);
            this.$router.replace( { query });
        }
    }
};
</script>