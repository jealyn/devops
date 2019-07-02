<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" :model="form" label-width="78px" onsubmit="return false">
            <el-form-item label="minion ID">
                <el-input v-model.trim="form.minionId" placeholder="请输入minionId" clearable></el-input>
            </el-form-item>
            <el-form-item label="内网IP">
                <el-input v-model.trim="form.privateIp" placeholder="请输入内网IP地址" clearable></el-input>
            </el-form-item>
            <el-form-item prop="platformId" label="云平台" size="small">
                <el-select v-model.trim="form.platformId" placeholder="请选择云平台" filterable clearable>
                    <el-option
                        v-for="item in resouces.platforms"
                        :value="item"
                        :label="item"
                        :key="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="el-icon-circle-plus-outline" size="small" @click="$showModal('addHost')">添加</el-button>
              <!-- <el-button type="primary" icon="plus" size="mini" @click="$showModal('addEcsBatch')">批量添加ECS</el-button> -->
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
        ...mapGetters({
            filterClusterList: 'clusterModule/filterClusterList',
            resouces: 'projectModule/resouces',
        }),
        query() {
            return this.$route.query;
        }
    },
    created() {
        this.getResoucesReq();
    },
    methods: {
        ...mapActions({
            hostListReq: 'hostModule/getHostList',
            getResoucesReq: 'projectModule/getResouces',
        }),
        getList(form) { 
            const query = this.$formatSearchData(this.form);
            this.hostListReq(query);
            this.$router.replace( { query });
        }
    },
};
</script>