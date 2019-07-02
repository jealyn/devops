<template>
    <div>
    <!-- 批量添加 -->
        <el-card style="width:100%;margin:0 auto;">
            <div slot="header" class="clearfix">
                <el-button type="primary" plain size="small" icon="el-icon-plus" @click="addRow('versionForm', versionForm.versionBuild)" style="float:right;margin-left:10px;"> 新增 </el-button>
                <el-button type="primary" icon="el-icon-upload" plain size="small" @click="handleSubmit('versionForm')" style="float:right;"> 提交 </el-button>
            </div>
            <el-form :model="versionForm" :rules="rules" ref="versionForm" label-position="right" size="small" v-loading="$isShowLoading('versionForm')" element-loading-text="正在提交中...">
                <el-form-item label="审核人" prop="approverList" class="approverList" style="position: absolute;left: 250px;top: 155px;width: 300px;" v-if="versionForm.approve">
                    <el-select 
                        filterable
                        v-model.trim="versionForm.approverList" 
                        placeholder="请选择审核人" 
                        serachable
                    >
                        <el-option
                            style="max-width:100%"
                            v-for="item in filterApprove"
                            :key="item.uid"
                            :label="item.user_name + ' (' + item.cn_name + ')'"
                            :value="item.uid + '+' + item.cn_name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-table border :data="versionForm.versionBuild" default-expand-all>
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-row :gutter="60">
                                <el-col :span="6" v-show="scope.row.deployImmediately">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.groupId'" label-width="80px" label="服务器组">
                                        <el-select 
                                            filterable
                                            clearable 
                                            :disabled="!scope.row.deployImmediately" 
                                            v-model.trim="scope.row.groupId"  
                                            placeholder="请选择目标服务器组" 
                                        >
                                            <el-option
                                                style="max-width:100%"
                                                v-for="item in filterGroupList"
                                                :key="item.groupId"
                                                :label="item.name "
                                                :value="item.groupId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" v-show="scope.row.deployImmediately">
                                    <el-form-item label="部署模板" label-width="68px" :prop="'versionBuild.' + scope.$index + '.modId'">
                                        <el-select 
                                            style="width:100%;"
                                            :disabled="!scope.row.deployImmediately" 
                                            v-model.trim="scope.row.modId" 
                                            placeholder="请选择部署模板" 
                                            serachable 
                                            filterable>
                                            <el-option
                                                style="max-width:100%"
                                                v-for="item in filterModList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>                                                
                                </el-col>
                                <el-col :span="6" v-show="scope.row.deployImmediately">
                                    <el-form-item label="服务器" label-width="68px" :prop="'versionBuild.' + scope.$index + '.hostList'">
                                        <el-select 
                                            style="width:100%;"
                                            filterable
                                            clearable 
                                            :disabled="!scope.row.deployImmediately" 
                                            v-model.trim="scope.row.hostList" 
                                            multiple 
                                            placeholder="请选择部署服务器" 
                                            @focus="handleSelectHost()"
                                        >
                                            <el-option
                                                style="max-width:100%"
                                                v-for="item in filterHostList"
                                                :key="item.hostId"
                                                :label="item.name + ' ' +item.privateIp"
                                                :value="item.hostId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="60">
                                <el-col :span="3">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.sqlUpdate'" label-width="80px" label="升库">
                                        <el-switch v-model.trim="scope.row.sqlUpdate"></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3" v-show="scope.row.sqlUpdate">
                                    <el-form-item>
                                        <el-upload
                                            :disabled="!scope.row.sqlUpdate"
                                            class="uploadSql"
                                            :with-credentials="true"
                                            :headers="headers"
                                            :limit="1"
                                            :on-success="handleUploadOk"
                                            action="/apis/version/operation/upload">
                                            <el-button :disabled="!scope.row.sqlUpdate" type="text">上传SQL</el-button>
                                        </el-upload>
                                    </el-form-item>  
                                </el-col>
                                <el-col :span="6" v-show="scope.row.sqlUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.sqlUrl'" label="sql地址" label-width="68px">
                                        <el-input v-model.trim="scope.row.sqlUrl" disabled></el-input>
                                    </el-form-item>  
                                </el-col>
                                <el-col :span="6" v-show="scope.row.sqlUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.sqlInfo'" label="升库说明" label-width="68px">
                                        <el-input :disabled="!scope.row.sqlUpdate" v-model.trim="scope.row.sqlInfo" ></el-input>
                                    </el-form-item>        
                                </el-col>
                            </el-row>
                            <el-row :gutter="60">
                                <el-col :span="6">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.configUpdate'" label-width="80px" label="配置更新">
                                        <el-switch v-model.trim="scope.row.configUpdate" :disabled="!scope.row.hasApollo"></el-switch>
                                    </el-form-item>                                                
                                </el-col>
                                <el-col :span="18"  v-show="scope.row.configUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.configInfo'"  label-width="68px" label="配置说明">
                                        <el-input class="disabled-text" :disabled="!scope.row.configUpdate" placeholder="" v-model.trim="scope.row.configInfo"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row> 
                            <el-row :gutter="60">
                                <el-col :span="6">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.nginxUpdate'" label="更新Nginx">
                                        <el-switch :disabled="versionForm.approve" v-model.trim="scope.row.nginxUpdate" @change="handleNginxChange(scope.row.nginxUpdate)"></el-switch>
                                        <el-popover
                                            placement="right"
                                            width="200"
                                            trigger="hover"
                                            content="首次配置，请开启Nginx更新！">
                                            <span slot="reference" class="nginx-info el-icon-info"></span>
                                        </el-popover>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" v-show="scope.row.nginxUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.logDir'"  label-width="68px" label="日志路径">
                                        <el-input class="disabled-text" disabled v-model.trim="scope.row.logDir" ></el-input>
                                    </el-form-item> 
                                </el-col>  
                                <el-col :span="6"  v-show="scope.row.nginxUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.deployDir'" label-width="68px" label="部署路径">
                                        <el-input class="disabled-text" disabled v-model.trim="scope.row.deployDir" ></el-input>
                                    </el-form-item>  
                                </el-col>   
                                <el-col :span="6"  v-show="scope.row.nginxUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.nginxName'" label-width="68px" label="配置名称">
                                    <el-input class="disabled-text" disabled v-model.trim="scope.row.nginxName" ></el-input>
                                    </el-form-item>         
                            </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24"  v-show="scope.row.nginxUpdate">
                                    <el-form-item :prop="'versionBuild.' + scope.$index + '.nginxContent'" label="Nginx配置">
                                        <div class="codemirror">
                                            <codemirror  v-model="scope.row.nginxContent" :options="cmOption"></codemirror>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>                                  
                        </template>
                    </el-table-column>
                    <el-table-column prop="clusterId" label="业务名称" width="200px">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.clusterId'">
                                <el-select 
                                    class="full-width" 
                                    filterable
                                    v-model.trim="scope.row.clusterId" 
                                    placeholder="请选择业务名称" 
                                    serachable 
                                    @change="handleClusterChange(scope.row.clusterId)">
                                    <el-option
                                        style="max-width:100%"
                                        v-for="item in filterClusterList"
                                        :key="item.clusterId"
                                        :label="item.business"
                                        :value="item.clusterId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column  label="项目名称" prop="projectId">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.projectId'" :rules="{required: true, message: '请选择项目名称', trigger: 'blur'}">
                                <el-select 
                                    class="full-width" 
                                    filterable
                                    v-model.trim="scope.row.projectId" 
                                    placeholder="请选择项目名称" 
                                    serachable 
                                    @change="handleProjectChange(scope.row.projectId, scope.$index)">
                                    <el-option
                                        style="max-width:100%"
                                        v-for="item in filterProjectList"
                                        :key="item.projectId"
                                        :label="item.name"
                                        :value="item.projectId"
                                    >
                                        <span style="float: left">{{ item.name }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.approve ? "审核开启" : "审核关闭" }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="分支/tag" prop="gitTagOrBranches" width="240px">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.gitTagOrBranches'" :rules="{required: true, message: '请选择Tag或分支', trigger: 'blur'}">
                                <el-select 
                                    class="full-width" 
                                    v-model.trim="scope.row.gitTagOrBranches" 
                                    placeholder="请选择目标Tag或者分支" 
                                    filterable
                                    @change="handleTagChange(filterProjectDetail.tags, filterProjectDetail.branches, scope.$index)"
                                >
                                    <el-option-group
                                        style="max-width:100%"
                                        key="tags"
                                        label="标签"
                                        v-if="filterProjectDetail.tags"
                                    >
                                        <el-option
                                            style="max-width:100%"
                                            v-for="item in filterProjectDetail.tags"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                        </el-option>
                                    </el-option-group>
                                    <el-option-group
                                        style="max-width:100%"
                                        key="branches"
                                        label="分支"
                                        v-if="filterProjectDetail.branches"
                                    >
                                        <el-option
                                            style="max-width:100%"
                                            v-for="item in filterProjectDetail.branches"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="versionCode" width="140px" label="版本号">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.versionCode'" :rules="{required: true, message: '请输入版本号', trigger: 'blur'}">
                                <el-input placeholder="请输入版本号" v-model="scope.row.versionCode"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="commitId" label="commit id" width="200px">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.commitId'" >
                                <el-input type="textarea" autosize disabled v-model="scope.row.commitId"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="commit" label="更新内容" width="260px">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.commit'">
                                <el-input type="textarea" autosize placeholder="请输入更新内容" v-model="scope.row.commit"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deployImmediately" label="立即部署" width="80px">
                        <template scope="scope">
                            <el-form-item :prop="'versionBuild.' + scope.$index + '.deployImmediately'">
                                <el-switch :disabled="versionForm.approve" v-model.trim="scope.row.deployImmediately"></el-switch>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right"  label="操作" width="100px">
                        <template slot-scope="scope">
                            <el-form-item>
                                <el-button type="danger" icon="el-icon-delete" plain @click.native.prevent="deleteRow(scope.$index, versionForm.versionBuild)" size="small"> 移除 </el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import 'codemirror/mode/nginx/nginx.js';
import 'codemirror/theme/cobalt.css';
import { Notification } from 'element-ui';
import Cookies from 'js-cookie';

export default {
    data() {
        // 服务器校验规则
        // let checkHostList = (rule, value, callback) => {
        //     if(this.versionForm.deployImmediately && !this.versionForm.groupId && value.length === 0) {
        //          callback(new Error('服务器和服务器组至少选择一项'));
        //     } else {
        //         callback();
        //     }
        // };
        // 服务器分组校验规则
        // let checkGroup = (rule, value, callback) => {
        //     if(this.versionForm.deployImmediately && this.versionForm.hostList.length === 0 && !value) {
        //          callback(new Error('服务器和服务器组至少选择一项'));
        //     } else {
        //         callback();
        //     }
        // };
        // 部署模板校验规则
        // let checkmodId = (rule, value, callback) => {
        //     if(this.versionForm.deployImmediately && !value) {
        //         callback(new Error('请选择部署模板'));
        //     } else {
        //         callback();
        //     }
        // };
        //选择部署审核人校验规则
        let checkApprove = (rule, value, callback) => {
            if(this.versionForm.approve && !value) {
                callback(new Error('请选择审核人'));
            } else {
                callback();
            }
        };
        return {
            headers: {
                token: encodeURIComponent(Cookies.get('GM_TOKEN') || ''), 
                appId: '0407296056293301'
            },
            validate: false,
            versionForm: {
                // appdisplay: true,
                approve: false,
                approverList: '', 
                versionBuild: [{ 
                    projectId: '',
                    commit: '',
                    gitTag: '',
                    gitBranch: '',
                    configUpdate: false,
                    configInfo: '',
                    sqlUpdate: false,
                    sqlUrl: '',
                    sqlInfo: '',
                    versionCode: '',
                    nginxUpdate: false,
                    hasApollo: false,
                    nginxContent: '',
                    deployImmediately: false,
                    modId: '',
                    groupId: '',
                    hostList: '',
                    deployDir: '',
                    logDir: '',
                    nginxName: '',
                }],
            },
            //codemirrer配置选项
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-nginx-conf',
                theme: 'cobalt',
                readOnly: true,
            },
            rules: {
                // hostList: [
                //     {
                //         validator: checkHostList,
                //         trigger: 'blur',
                //     }
                // ],
                // groupId: [
                //     {
                //         validator: checkGroup,
                //         trigger: 'blur'
                //     }
                // ],
                // modId: [
                //     {
                //         validator: checkmodId,
                //         trigger: 'blur'
                //     }
                // ],
                approverList: [
                    {
                        validator: checkApprove,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.getResoucesReq();
        this.getClusterListReq({ currentPage: 1, pageSize: 1000 });
        this.handleSelectMod();
        this.handleSelectGroup();
        this.getProjectList({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapState({
            "status": state => state.operationModule.status
        }),
        ...mapGetters({
            filterClusterList: 'clusterModule/filterClusterList',
            filterProjectList: 'projectModule/filterProjectList',
            filterHostList: 'hostModule/filterHostList',
            filterProjectDetail: 'projectModule/filterProjectDetail',
            filterModList: 'modModule/filterModList',
            filterGroupList: 'groupModule/filterGroupList',
            resouces: 'projectModule/resouces',
            filterApprove: 'deployModule/filterApproveList'
        }),
    },
    methods: {
        ...mapActions({
            getClusterListReq: 'clusterModule/getClusterList',
            getProjectList: 'projectModule/getProjectList',
            getProjectDetailReq: 'projectModule/getProjectDetail',
            buildVersionReq: 'operationModule/addbuildVersion',
            getHostListReq: 'hostModule/getHostList',
            getModListReq: 'modModule/getModList',
            getGroupListReq: 'groupModule/getGroupList',
            getResoucesReq: 'projectModule/getResouces',
            getApproveList: 'deployModule/getApproveList',
        }),
        //删除该行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //新增一行
        addRow(versionForm, tableData, event){
            this.$refs[versionForm].validate((valid) => {
                if (valid) {
                    tableData.unshift({ 
                        projectId: '',
                        commit: '',
                        gitTag: '',
                        gitBranch: '',
                        configUpdate: false,
                        configInfo: '',
                        sqlUpdate: false,
                        sqlUrl: '',
                        sqlInfo: '',
                        versionCode: '',
                        nginxUpdate: false,
                        hasApollo: false,
                        nginxContent: '',
                        deployImmediately: false,
                        modId: '',
                        groupId: '',
                        hostList: [],
                        deployDir: '',
                        logDir: '',
                        nginxName: ''
                    });
                }
            });
        },
        //设置是否可编辑Nginx内容
        handleNginxChange(value) {
            this.cmOption.readOnly = value ? false : true;
        },
        handleSubmit(data) {
                this.$refs[data].validate((valid) => {
                if (valid) {
                    let approveList = [];
                    //根据是否以Vx开头来判断选择的是分支还是tag
                    this.versionForm.versionBuild.map((item) => {
                        approveList.push(item.approve);
                        let gitTagOrBranches = item.gitTagOrBranches;
                        if(gitTagOrBranches.search(/^v\d/g) === 0) {
                            item.gitTag = gitTagOrBranches;
                            item.gitBranch = ''; 
                        } else {
                            item.gitBranch = gitTagOrBranches;
                            item.gitTag = '';
                        }
                        //版本号取消空格
                        item.versionCode = item.versionCode.replace(/\s/g, '');
                    });
                    //权限判断
                    if(new Set(approveList).size > 1) {
                        Notification.error({
                            title: "错误",
                            message: "请选择具有相同审核权限的项目！"
                        });
                        return false;
                    }
                    //取出审核id和审核人
                    let approves = this.versionForm.approve ? this.versionForm.approverList.split('+') : '';
                    let approverUid = approves === '' ? '' : approves[0].trim();
                    let approveBy = approves === '' ? '' : approves[1].trim();
                    let data = this.$trim({
                        approverUid,
                        approveBy,
                        ...this.versionForm
                    });
                    this.buildVersionReq(data).then(() => {
                        //当提交成功之后再进行跳转
                        if(this.$store.state.operationModule.status) {
                            this.$router.push('/deployCenter/version/index');
                        }
                    });             
                }
            });
        },
        //业务change事件
        handleClusterChange(data) {
            this.getProjectList({ clusterId: data, pageSize: 1000, currentPage: 1 });
        },
        //项目change事件
        handleProjectChange(data, inx) {
            const project = {
                projectId: data,
            };
            this.getProjectDetailReq(project).then( () => {
                //填充内容
                this.versionForm.versionBuild[inx].nginxContent = this.filterProjectDetail.nginxContent || '';
                this.versionForm.versionBuild[inx].configUpdate = false;
                this.versionForm.versionBuild[inx].approve = this.filterProjectDetail.approve;
                //判断权限
                if(this.versionForm.versionBuild.length > 1 && this.versionForm.versionBuild[inx].approve !== this.versionForm.approve) {
                    Notification.error({
                        title: "错误",
                        message: "请选择具有相同审核权限的项目！"
                    });
                } else {
                    this.versionForm.approve = this.filterProjectDetail.approve ? true : false;
                }
                //需要审核的话，就不能点击立即部署按钮
                if(this.versionForm.versionBuild[inx].approve) {
                    this.versionForm.versionBuild[inx].deployImmediately = false;
                    this.versionForm.versionBuild[inx].nginxUpdate = false;
                    this.getApproveList({ rid: this.resouces.approveUid });
                }
                this.versionForm.versionBuild[inx].hasApollo = this.filterProjectDetail.configName.trim() ? true : false; 
                this.versionForm.versionBuild[inx].logDir = this.filterProjectDetail.pillar.DIR_LOGS;
                this.versionForm.versionBuild[inx].deployDir = this.filterProjectDetail.pillar.DIR_WWW;
                this.versionForm.versionBuild[inx].nginxName = this.filterProjectDetail.pillar.NGINX_NAME;
                this.versionForm.versionBuild[inx].groupId = this.filterProjectDetail.defaultGroupId;
                this.versionForm.versionBuild[inx].modId = this.filterProjectDetail.modId;
            });
        },
        handleSelectHost() {
            this.getHostListReq({ pageSize: 1000, currentPage: 1 });
        },
        handleSelectMod() {
            this.getModListReq({ pageSize: 1000, currentPage: 1 });
        },
        handleSelectGroup() {
            this.getGroupListReq({ pageSize: 1000, currentPage: 1 });
        },
        //分支或tag的change事件，主要是做分支和tag的判断以及填充相关信息
        handleTagChange(tags, branches, inx) {
            for (let i = 0; i < tags.length; i++) {
                 if(tags[i].name === this.versionForm.versionBuild[inx].gitTagOrBranches) {
                    this.versionForm.versionBuild[inx].commit = tags[i].commit.message;
                    this.versionForm.versionBuild[inx].commitId = tags[i].commit.id;
                    this.versionForm.versionBuild[inx].versionCode = this.versionForm.versionBuild[inx].gitTagOrBranches;
                }
            }
            for (let i = 0; i < branches.length; i++) {
                if (branches[i].name === this.versionForm.versionBuild[inx].gitTagOrBranches) {
                    this.versionForm.versionBuild[inx].commitId = branches[i].commit.id;
                    this.versionForm.versionBuild[inx].commit = branches[i].commit.message;
                    //随机版本号
                    this.versionForm.versionBuild[inx].versionCode = 'v-' + Math.random().toString(18).substr(10);
                }
            }
            this.versionForm.versionBuild[inx].projectId = this.versionForm.versionBuild[inx].projectId;
        },
        //文件上传
        handleUploadOk(response, file, fileList) {
            this.versionForm.versionBuild[0].sqlUrl = response.data;
        }
    },
    watch: {},
};
</script>

<style>
.el-card__header {
    height: 68px;
}
.full-width {
    width:100%;
}
.el-select__tags {
    width: 100%;
}
.nginx-info {
    color: #409EFF;
}
.disabled-text.el-input.is-disabled .el-input__inner, .disabled-text.el-textarea.is-disabled .el-textarea__inner {
    color:#606266;
}
label[for="approverList"]::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
.CodeMirror-code {
    line-height: 18px;
}
.approverList .el-form-item__error {
    left: 68px;
}
</style>
