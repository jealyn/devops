<template>
    <div v-loading="$isShowLoading('apolloList')">
        <el-table :data="apolloList" border>
            <el-table-column prop="configId" label="configId"></el-table-column>
            <el-table-column prop="name" label="配置名称"></el-table-column>
            <el-table-column prop="frame" label="Frame">
                <template slot-scope="scope">
                    <div v-if="scope.row.frame === 1">Java</div> 
                    <div v-if="scope.row.frame === 2">Node</div> 
                    <div v-if="scope.row.frame === 3">PHP</div> 
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.row.configId)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>

        <!-- <el-card style="width:960px;margin:0 auto;">
            <div slot="header" class="clearfix">
                <span>配置文件</span>
                <el-button type="primary" plain size="small" icon="el-icon-plus" @click="addRow(inServForm.infiledList)" style="float: right;margin-left:10px;"> 新增 </el-button>
                <el-button type="primary" icon="el-icon-upload" plain size="small" @click="submitForm('inServForm')" style="float: right;"> 提交 </el-button>
            </div>
            <el-form status-icon :model="inServForm" ref="inServForm" size="medium">
                <el-table border :data="inServForm.infiledList">
                    <el-table-column prop="fildna" label="文件名称">
                        <template scope="scope">
                            <el-form-item :prop="'infiledList.' + scope.$index + '.fildna'" :rules="{required: true, message: '文件名称不能为空', trigger: 'blur'}">
                                <el-input placeholder="请输入文件名称" v-model="scope.row.fildna"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="fildtp" label="文件类型">
                        <template scope="scope">
                            <el-form-item :prop="'infiledList.' + scope.$index + '.fildtp'" :rules="{required: true, message: '请选择文件类型', trigger: 'blur'}">
                                <el-select v-model="scope.row.fildtp" clearable placeholder="请选择文件类型">
                                    <el-option
                                        v-for="item in fildtps"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                        <template scope="scope">
                             <el-form-item :prop="'infiledList.' + scope.$index + '.remark'">
                                <el-input type="textarea" rows="3" placeholder="请输入备注信息" v-model="scope.row.remark"></el-input>
                             </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right"  label="操作">
                        <template slot-scope="scope">
                            <el-form-item>
                                <el-button type="danger" icon="el-icon-delete" plain @click.native.prevent="deleteRow(scope.$index, inServForm.infiledList)" size="small"> 移除 </el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-card> -->
    </div>
</template> 

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            // validate: false,
            // inServForm: {
            //     infiledList: [{ fildna: '', fildtp: '', remark: '' }],
            // },
            // fildtps: [{ text: '字符', value: '1' }, { text: '数字', value: '2' }],
        };
    },
    created() {
        
    },
    computed: {
       ...mapGetters({
            apolloList: 'apolloModule/filterApolloList',
            pagination: 'apolloModule/pagination'
       })
    },
    methods: {
        ...mapActions({
            getApolloDetailReq: 'apolloModule/getApolloDetail'
        }),
        // deleteRow(index, rows) {//删除改行
        //     rows.splice(index, 1);
        // },
        // addRow(tableData, event){
        //     tableData.push({ fildna: '', fildtp: '', remark: '' });
        // },
        // submitForm(form) {
        //     this.$refs[form].validate((valid) => {
        //         if (valid) {
        //             alert('submit!');
        //         }
        //     });
        // },
        handleEdit(data) {
            this.$router.push({
                path: `/configCenter/project/Apollo/Detail`,
                query: {
                    configId: data,
                    idc: 'aliyun'
                }
            });
            let params = { configId: data, idc: 'aliyun' };
            this.getApolloDetailReq(params);
        }
    },
    watch: {
        
    }
};
</script>

<style>
.el-card tbody td {
    padding-bottom: 0;
}
</style>
