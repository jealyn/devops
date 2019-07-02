<template>
    <div>
        <el-dialog
          :title="title"
          :visible="modalIsShow"
          width="30%"
          :before-close="closeModal"
          :close-on-click-modal="false"
          @close="handleCloseModal"
          center
        >
            <el-form
              :model="projectForm"
              :rules="rules"
              ref="projectForm"
              label-width="110px"
              v-loading="$isShowLoading('distributorDetail')"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="项目名称" size="small" prop="name">
                            <el-input v-model.trim="projectForm.name" placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="语言" prop="frame">
                            <el-select
                              v-model.trim="projectForm.frame"
                              placeholder="选择项目语言"
                              size="small"
                              style="width:100%"
                              filterable
                            >
                                <el-option
                                  v-for="item in filterFrameList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="部署模板" prop="modId">
                            <el-select
                              v-model.trim="projectForm.modId"
                              placeholder="选择部署模板"
                              size="small"
                              style="width:100%"
                              filterable
                            >
                                <el-option
                                  v-for="item in filterModList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="集群分组" prop="clusterId">
                            <el-select
                              v-model.trim="projectForm.clusterId"
                              placeholder="请选择业务集群"
                              size="small"
                              style="width:100%"
                              filterable
                            >
                                <el-option
                                  v-for="item in filterClusterList"
                                  :key="item.clusterId"
                                  :label="item.business"
                                  :value="item.clusterId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item size="small">
                            <el-button style="margin-left:-50px;" type="text" @click="handleCreateCluster">创建集群分组</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <el-form-item label="开启部署审核" prop="approve">
                            <el-switch v-model.trim="projectForm.approve"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="Git地址" size="small" prop="gitUrl">
                            <el-input
                              v-model.trim="projectForm.gitUrl"
                              placeholder="请输入项目的Git地址"
                              size="small"
                              @blur="setGitInfo()"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="项目组" size="small" prop="gitNamespace">
                            <el-input v-model.trim="projectForm.gitNamespace" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="项目名" size="small" prop="gitName">
                            <el-input v-model.trim="projectForm.gitName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="项目描述" prop="description">
                            <el-input v-model.trim="projectForm.description" type="textarea" placeholder="请输入项目描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="配置文件" size="small" prop="configId ">
                            <el-select
                            v-model.trim="projectForm.configId"
                            placeholder="请选择配置文件"
                            style="width:100%"
                            filterable
                            clearable
                            >
                                <el-option
                                style="max-width:100%"
                                v-for="item in apolloList"
                                :key="item.configId"
                                :label="item.configId"
                                :value="item.configId"
                                >
                                    <span style="float: left">{{ item.configId }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="编译地址" size="small" prop="jenkinsUrl">
                            <el-select
                              :disabled="isUpdate"
                              style="width:100%"
                              filterable
                              v-model.trim="projectForm.jenkinsUrl"
                              placeholder="请选择Jenkins地址"
                            >
                                <el-option
                                v-for="item in filterJenkinsList"
                                :key="item.url"
                                :label="item.jobName"
                                :value="item.url"
                                ></el-option>
                            </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item size="small">
                            <el-button :disabled="!$store.state.projectModule.status" style="margin-left:-50px;" type="text" @click="handleCreateJenkins">新建编译地址</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="部署目标" size="small" prop="defaultGroupId">
                            <el-select
                            v-model.trim="projectForm.defaultGroupId"
                            placeholder="请选择目标服务器组"
                            style="width:100%"
                            filterable
                            >
                                <el-option
                                v-for="item in filterGroupList"
                                :key="item.groupId"
                                :label="item.name"
                                :value="item.groupId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item size="small">
                            <el-button style="margin-left:-50px;" type="text" @click="handleCreateGroup">创建服务器组</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addOrUpdate('projectForm')"
                    :loading="$isShowLoading('projectAddOrUpdate')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            filterFrameList: [
                { id: 1, name: 'JAVA' }, { id: 2, name: 'Node' }, { id: 3, name: 'PHP' }
            ],
            projectForm: {
                id: '',
                name: '',
                projectId: '',
                clusterId: '',
                delete: false,
                description: '',
                gitUrl: '',
                gitNamespace: '',
                gitName: '',
                gitId: '',
                jenkinsUrl: '',
                configId: '',
                configName: '',
                defaultGroupId: '',
                frame: null,
                approve: false,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur',
                    }
                ],
                frame: [
                    {
                        required: true,
                        message: '请选择项目所用语言',
                        trigger: 'blur',
                    }
                ],
                jenkinsUrl: [
                    {
                        required: true,
                        message: '请选择项目编译地址',
                        trigger: 'blur',
                    }
                ]
            },
        };
    },
    created() {
        this.getGroupReq({ currentPage: 1, pageSize: 1000 });
        this.getClusterList({ currentPage: 1, pageSize: 1000 });
        this.getJenkinsList();
        this.getApolloListReq({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapGetters({
            apolloList: 'apolloModule/filterApolloList',
            filterDetail: 'projectModule/filterProjectDetail',
            filterClusterList: 'clusterModule/filterClusterList',
            filterJenkinsList: 'projectModule/filterJenkinsList',
            filterGroupList: 'groupModule/filterGroupList',
            resouces: 'projectModule/resouces',
            filterModList: 'modModule/filterModList'
        }),
        isUpdate() {
            return this.$isShowModal('updateProject');
        },
        title() {
            if (!this.isUpdate) {
                return '新增项目';
            } else {
                return '更新项目';
            }
        }, 
        modalIsShow() {
            return (
                this.$isShowModal('addProject') || this.$isShowModal('updateProject')
            );
        },
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            addOrUpdateProject: 'projectModule/addOrUpdateProject',
            getClusterList: 'clusterModule/getClusterList',
            getGroupReq: 'groupModule/getGroupList',
            getCheckUrlReq: 'projectModule/getCheckUrl',
            getJenkinsListReq: 'projectModule/getJenkinsList',
            getJenkinsParamsReq: 'projectModule/getJenkinsParams',
            getApolloListReq: 'apolloModule/getApolloList',
        }),
        getJenkinsList() {
            this.getJenkinsListReq();
        },
        closeModal() {
            if (this.isUpdate) {
                this.$hideModal('updateProject');
            } else {
                this.$hideModal('addProject');
            }
        },
        addOrUpdate(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.projectForm.configName = this.projectForm.configId || 'defalutName';
                    let params = this.$trim({
                        ...this.projectForm
                    });
                    if (!this.isUpdate) {
                        delete params.id;
                    }
                    this.addOrUpdateProject(params);
                }
            });
        },
        setValues() {
            const {
                id,
                projectId,
                clusterId,
                tags,
                frame,
                branches,
                configId,
                gitUrl,
                gitName,
                gitNamespace,
                gitId,
                jenkinsUrl,
                name,
                description,
                defaultGroupId,
                approve,
                modId
            } = this.filterDetail;
            this.projectForm = {
                id,
                projectId,
                clusterId,
                tags,
                branches,
                configId,
                gitUrl,
                gitName,
                gitNamespace,
                gitId,
                jenkinsUrl,
                name,
                description,
                defaultGroupId,
                frame,
                approve,
                modId
            };
        },
        handleCloseModal() {
            this.$refs['projectForm'].resetFields();
            if (this.isUpdate) {
                this.$hideModal('updateProject');
            } else {
                this.$hideModal('addProject');
            } 
        },  
        handleCreateCluster() {
            this.$showModal('addClusterFromProject');
        },
        handleCreateGroup() {
             this.$showModal('addGroupFromProject');
        },
        handleCreateJenkins() {
            if(this.$store.state.projectModule.status) {
                this.$showModal('addJenkins');
                let data = {
                    gitUrl: this.projectForm.gitUrl,
                    jobName: this.projectForm.gitName
                };
                this.getJenkinsParamsReq(data);
            }
        },
        // 填充gitlab 项目信息
        setGitInfo() {
            const data = { gitUrl: this.projectForm.gitUrl };
            this.getCheckUrlReq(data).then(() => {
                if(this.$store.state.projectModule.status) {
                    const url = this.projectForm.gitUrl.split('/');
                    if(url[0].includes('git')) {
                        let list1 = url[0].split(':');
                        let list2 = url[1].split('.');
                        this.projectForm.gitNamespace = list1[1];
                        this.projectForm.gitName = list2[0];
                    } else {
                        this.projectForm.gitNamespace = url[3];
                        this.projectForm.gitName = url[4].split('.')[0];
                    } 
                }
                
            });
        },
    },
    watch: {
        filterDetail() {
            this.isUpdate && this.setValues();
        }
    }
};
</script>

<style>
    .el-select__tags {
        width: 100%;
    }
    label[for="gitUrl"]::before{
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
</style>
