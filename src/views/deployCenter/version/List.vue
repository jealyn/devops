<template>
    <div v-loading="$isShowLoading('versionList')" element-loading-text="正在加载中...">
        <el-table 
            :data="versionList"
            border
            style="width: 100%"
            :row-class-name="rowClassName"
            @cell-click="handleBuildStatus">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="创建者">
                            <span>{{ props.row.createdBy }}</span>
                        </el-form-item>
                        <!-- <el-form-item label="创建时间">
                            <span>{{ props.row.createdTime }}</span>
                        </el-form-item> -->
                        <el-form-item label="更新者">
                            <span>{{ props.row.updatedBy }}</span>
                        </el-form-item>
                        <el-form-item label="审核人">
                            <span>{{ props.row.approveBy || "-"}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="更新时间">
                            <span>{{ props.row.updatedTime }}</span>
                        </el-form-item> -->
                        <el-form-item label="sql地址">
                            <span v-if="props.row.sqlUrl"> <el-button type="text" @click="handleDownSql(props.row.sqlUrl)">下载</el-button></span>
                            <span v-else>-</span>
                        </el-form-item>
                        <el-form-item label="sql更新说明">
                            <span>{{ props.row.sqlInfo || "-"}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="审核状态">
                            <span v-if="props.row.approveStatus === 'DENY'">审核未过</span>
                            <span v-else-if="props.row.approveStatus === 'ALLOW'">审核通过</span>
                            <span v-else-if="props.row.approveStatus === 'IGNORE'">无需审核</span>
                            <span v-else-if="props.row.approveStatus === 'UNDER_REVIEW'">审核中</span>
                            <span v-else>-</span>
                        </el-form-item> -->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="项目名称"
                prop="project.name">
            </el-table-column>
            <el-table-column
                label="版本号"
                prop="versionCode"
                width="120px">
            </el-table-column>
            <el-table-column
                label="分支/Tag"
            >
                <template slot-scope="scope">
                    <el-popover
                        placement="top"
                        trigger="hover"
                        :content="scope.row.commit || '未更新'">
                        <el-button slot="reference" type="text">
                            <div v-if="scope.row.gitTag">Tag: {{scope.row.gitTag}}</div>
                            <div v-if="scope.row.gitBranch">分支：{{scope.row.gitBranch}}</div>
                        </el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="配置文件" prop="configId">
                <template slot-scope="scope">
                    <el-popover
                        placement="top"
                        trigger="hover"
                        :content="scope.row.configInfo || '配置文件未更新'">
                        <el-button slot="reference" type="text" @click="handleGoConfig(scope.row.project.configId)">{{scope.row.project.configId ? scope.row.project.configId : ''}}</el-button>    
                    </el-popover>
                </template>
            </el-table-column>
            <!-- <el-table-column
                label="配置更新说明"
                prop="configInfo">
                <template slot-scope="scope">
                    <el-popover
                        placement="top"
                        trigger="hover"
                        :content="scope.row.configUpdate ? scope.row.configInfo : '配置文件未更新'">
                        <el-button slot="reference" type="text">查看</el-button>
                    </el-popover>
                </template>
            </el-table-column> -->
            <el-table-column
                label="编译状态"
                prop="buildStatus"
                width="120px">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.buildStatus === 'SUCCESS'" type="success">编译成功
                    </el-tag>
                    <el-tag
                        v-else-if="scope.row.buildStatus === 'FAILED'" type="danger">编译失败
                    </el-tag>
                    <el-button
                        v-else-if="scope.row.buildStatus === 'RUNNING'" :loading="true" size="small" type="text">编译中
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="部署状态"
                prop="deployStatus"
                width="120px">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.deployStatus === 'SUCCESS'" type="success">部署成功
                    </el-tag>
                    <el-tag
                        v-else-if="scope.row.deployStatus === 'FAILED' " type="danger">部署失败
                    </el-tag>
                    <el-button
                        v-else-if="scope.row.deployStatus === 'RUNNING'" size="small" :loading="true" type="text">部署中
                    </el-button>
                    <el-tag
                        v-else-if="scope.row.deployStatus === 'WAITING'" type="warning">等待部署
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="立即部署"
                width="100px"
            >
                <template slot-scope="scope">
                    {{scope.row.deployImmediately ? "是" : "否"}}
                </template>
            </el-table-column>
            <el-table-column
                label="审核状态"
                prop="approveStatus"
                width="120px">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.approveStatus === 'ALLOW'" type="success">审核通过
                    </el-tag>
                    <el-tag
                        v-else-if="scope.row.approveStatus === 'DENY'" type="danger">审核未过
                    </el-tag>
                    <el-tag
                        v-else-if="scope.row.approveStatus === 'UNDER_REVIEW'">审核中
                    </el-tag>
                    <el-tag
                        v-else-if="scope.row.approveStatus === 'IGNORE'" type="warning">无需审核 
                    </el-tag>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="createdTime">
            </el-table-column>
            <el-table-column
                label="更新时间"
                prop="updatedTime">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100px">
                <template slot-scope="scope">
                    <div><el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button></div>
                    <div>
                        <el-popover
                            placement="top"
                            width="160"
                            v-model="scope.row.visible"
                            trigger="click"
                        >
                            <p>确定重新编译该项目？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="scope.row.visible = false">
                                    取消
                                </el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleRebuild(scope.row)"
                                    >
                                    确定
                                </el-button>
                            </div>
                            <el-button
                                plain
                                style="margin-top:6px"
                                size="small"
                                :loading="$isShowLoading('rebuildVersionList')" 
                                slot="reference">
                                编译
                            </el-button>
                        </el-popover>
                    </div>
                    <div>
                        <el-button
                            style="margin-top:6px"
                            type="primary"
                            plain
                            size="small"
                            @click="handleDeploy(scope.row)"
                            v-if="scope.row.buildStatus === 'SUCCESS' && (scope.row.approveStatus === 'ALLOW' || scope.row.approveStatus === 'IGNORE')">部署
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"/>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters({
                versionList: 'versionModule/filterVersionList',
                versionDetail: 'versionModule/filterVersionDetail',
                pagination: 'versionModule/pagination',
            })
        },
        methods: {
            ...mapActions({
                buildVersionReq: 'operationModule/addbuildVersion',
                reBuildVersionReq: 'operationModule/reBuildVersion',
                getVersionDetailReq: 'versionModule/getVersionDetail',
                getVersionListReq: 'versionModule/getVersionList',
                getBuildListReq: 'buildModule/getBuildList',
                getDeployListReq: 'deployModule/getDeployList',
                getDownSqlReq: 'operationModule/getDownSql'
            }),
            rowClassName({ row }) {
                if (row.rid <= 0) {
                    return 'hidden';
                }
            },
            //重编译
            handleRebuild(data) {
                data.visible = false;
                let versionId = data.versionId;
                //重编译后刷新version列表
                this.reBuildVersionReq({ versionId }).then(() => {
                    const params = {
                        ...this.pagination
                    };
                    this.getVersionListReq(params);
                });
            },
            //部署
            handleDeploy(data) {
                this.$showModal('deployVersion');
                this.getVersionDetailReq(data);
            },
            //配置文件详情，携带configId和idc参数(默认为阿里云)
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
            //下载sql文件
            handleDownSql(data) {
                let params = {
                    ossKey: data,
                };
                this.getDownSqlReq(params);
            },
            handleEdit(data) {
                this.getVersionDetailReq(data);
                this.$showModal('updateVersion');
            },
            //显示编译详情 or 部署详情
            handleBuildStatus(row, column, cell, event) {
                if (column.property === 'buildStatus') {
                    this.$showModal('buildDetail');
                    const params = {
                        ...this.$route.query,
                        versionId: row.versionId,
                    };
                    this.getBuildListReq(params);
                }
                if (column.property === 'deployStatus') {
                    this.$showModal('deployDetail');
                    const params = {
                        ...this.$route.query,
                        versionId: row.versionId,
                    };
                    this.getDeployListReq(params);
                }
            },
        }
    };
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
  }
</style>


