<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" label-width="80px" :model="form" onsubmit="return false">
            <el-form-item label="分组名称">
                <el-input v-model.trim="form.name" placeholder="请输入分组名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="el-icon-circle-plus-outline" size="small" @click="$showModal('addGroup')">新建</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        const { name = '' } = this.$route.query;
        return {
            form: {
                
            }
        };
    },
    methods: {
        ...mapActions({
            getGroupListReq: 'groupModule/getGroupList'
        }),
        getList() {
            const query = this.$formatSearchData(this.form);
            this.getGroupListReq(query);
            this.$router.replace( { query });
        }
    }
};
</script>