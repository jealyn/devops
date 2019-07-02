<template>
    <div> 
        <div>
            <el-form :inline="true" :model="form" onsubmit="return false">
                <el-form-item label="机房" prop="idc">
                    <el-select v-model="form.idc" placeholder="请选择机房" filterable @change="getList(form)">
                        <el-option
                        v-for="item in resouces.platforms"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" icon="el-icon-circle-plus-outline" size="small"  @click="addItem()">添加配置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-for="(item, index) in apolloDetail" :key="item.id">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-input v-model.trim="item.namespace" style="width:150px;"></el-input>.<el-input v-model.trim="item.format" style="max-width:150px;"></el-input>
                    <!-- <span>{{item.namespace + '.' + item.format}}</span> -->
                    <el-button type="primary" style="float:right" size="mini" plain @click="submitForm(item)">提交修改</el-button>
                </div>
                <div style="margin:10px 0">
                    <span>是否启用:</span><el-switch v-model="item.enable"></el-switch>
                </div>
                <div class="codemirror">
                    <codemirror style="font-size:16px;" v-model.trim="item.content" @blur='handleSpace(item.content, index)' :options="cmOption"></codemirror>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'codemirror/mode/nginx/nginx.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        return {
            form: {
                idc: 'aliyun'
            },
            //codemirror配置项
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-nginx-conf',
                theme: 'cobalt',
                readOnly: false,
            },
        };
    },
    created() {
        this.getApolloDetailReq(this.$route.query);
        this.getResoucesReq();
    },
    computed: {
        ...mapGetters({
            apolloDetail: 'apolloModule/filterApolloDetail',
            resouces: 'projectModule/resouces'
        }),
    },
    methods: {
        ...mapActions({
            addOrUpdateApollo: 'apolloModule/addOrUpdateApollo',
            getApolloDetailReq: 'apolloModule/getApolloDetail',
            getResoucesReq: 'projectModule/getResouces',
            getApolloDetailReq: 'apolloModule/getApolloDetail'
        }),
        submitForm(item) {
            this.addOrUpdateApollo(item);
        },
        addItem() {
           this.$showModal('addNameSpace');
        },
        handleSpace(value, index) {
            let value2 = value.replace(/\n+/g, '\n');
            this.apolloDetail[index].content = value2;
        },
        //查询
        getList(form) {
            const query = {
                configId: this.$route.query.configId,
                idc: form.idc
            };
            let params = { configId: this.$route.query.configId, idc: form.idc };
            this.getApolloDetailReq(params);
            this.$router.replace( { query });
        },
    },
    watch: {
        
    }
};
</script>