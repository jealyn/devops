<template>
    <div v-loading="$isShowLoading('projectList')">
        <el-table :data="projectList" border :row-class-name="rowClassName">
            <el-table-column label="项目名称" prop="name"></el-table-column>
            <el-table-column label="配置文件" prop="configId" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleGoConfig(scope.row.configId)">{{scope.row.configId ? scope.row.configId : ''}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="编译地址" prop="jenkinsUrl" min-width="150px"></el-table-column>
            <el-table-column label="仓库地址" prop="gitUrl" min-width="150px"></el-table-column>
            <el-table-column label="项目描述" prop="description"></el-table-column>
            <el-table-column label="是否开启审核" prop="approve" width="120px">
                <template slot-scope="scope">
                    <span v-if="scope.row.approve === true">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <!-- <el-popover placement="top" width="160" v-model="scope.row.visible" trigger="click">
                        <p style="text-align: center;">确定移除该项目吗？</p>
                        <div style="text-align: right; margin: 0;">
                            <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              :loading="$isShowLoading('projectDelete')"
                              @click="handleDelete(scope.row)"
                            >确定</el-button>
                        </div>
                        <el-button type="danger" size="small" slot="reference">移除</el-button>
                    </el-popover> -->
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            projectList: 'projectModule/filterProjectList',
            pagination: 'projectModule/pagination',
            resouces: 'projectModule/resouces'
        })
    },
    methods: {
        ...mapActions({
            deleteProject: 'projectModule/deleteProject',
            getDetail: 'projectModule/getProjectDetail'
        }),
        handleEdit(data) {
            this.getDetail(data);
            this.$showModal('updateProject');
        },
        handleDelete(data) {
            this.deleteProject(data);
        },
        //跳转到配置文件详情
        handleGoConfig(data) {
            if(data !== '') {
                this.$router.push({
                    path: `/configCenter/project/Apollo/Detail`,
                    query: {
                        configId: data,
                        idc: 'aliyun'
                    }
                });
            }
        },
        rowClassName({ row }) {
            if (row.rid <= 0) {
                return 'hidden';
            }
        }
    }
};
</script>
