<template>
    <div>
        <el-dialog
          :title="'[版本部署] ' + versionDetail.versionCode" 
          :visible="modalIsShow"
          width="45%"
          @open="handleSelect"
          :before-close="closeModal"
          :close-on-click-modal="false"
          @close="handleCloseModal"
          center
        >
            <el-form ref="deployForm" :model="deployForm" label-width="130px" :rules="rules">
                <el-form-item label="部署模板" prop="modId">
                    <el-select
                      style="width:300px"
                      filterable
                      v-model="deployForm.modId"
                      clearable
                      placeholder="请选择部署模板"
                    >
                        <el-option
                          v-for="item in modList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部署服务器组" prop="groupId">
                    <el-select
                      style="width:300px"
                      filterable
                      v-model="deployForm.groupId"
                      clearable
                      placeholder="请选择目标服务器组"
                    >
                        <el-option
                          v-for="item in groupList"
                          :key="item.groupId"
                          :label="item.name"
                          :value="item.groupId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部署服务器" style="width:100%" prop="hostList">
                    <el-select
                      style="width:100%"
                      filterable
                      v-model="deployForm.hostList"
                      multiple
                      placeholder="请选择部署服务器"
                    >
                        <el-option
                          style="max-width:100%"
                          v-for="item in filterHostList"
                          :key="item.hostId"
                          :label="item.name + ' ' +item.privateIp"
                          :value="item.hostId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更新内容">
                    <el-input v-model="versionDetail.commit" type="textarea" autosize disabled></el-input>
                </el-form-item>
                <el-form-item label="是否更新配置文件">
                    <el-switch v-model="versionDetail.configUpdate" disabled></el-switch>
                </el-form-item>
                <el-form-item label="配置文件内容">
                    <el-input disabled type="textarea" v-model.trim="versionDetail.configInfo"></el-input>
                </el-form-item>
                <el-form-item label="是否更新Nginx">
                    <el-switch v-model.trim="versionDetail.nginxUpdate" disabled></el-switch>
                </el-form-item>
                <el-form-item label="nginx内容">
                    <div class="codemirror">
                        <codemirror  v-model="versionDetail.nginxContent" :options="cmOption"></codemirror>
                    </div>
                </el-form-item>
                <el-form-item label="sql更新说明" v-if="versionDetail.sqlUrl !== ''">
                    <el-input v-model.trim="versionDetail.sqlInfo" type="textarea" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary"  @click="handleSubmit('deployForm')">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog
          title="更新版本" 
          :visible="updateModalIsShow"
          width="45%"
          :before-close="closeModal"
          :close-on-click-modal="false"
          @close="handleCloseModal"
          center
        >
            <el-form ref="updateForm" :model="updateForm" label-width="130px" :rules="rules">
                <el-form-item label="是否更新配置文件">
                    <el-switch v-model="versionDetail.configUpdate"></el-switch>
                </el-form-item>
                <el-form-item label="配置文件内容">
                    <el-input :disabled="!versionDetail.configUpdate" type="textarea" autosize v-model.trim="versionDetail.configInfo"></el-input>
                </el-form-item>
                <el-form-item label="是否更新Nginx">
                    <el-switch v-model.trim="versionDetail.nginxUpdate" @change="handleNginxChange(versionDetail.nginxUpdate)"></el-switch>
                </el-form-item>
                <el-form-item label="nginx内容">
                    <div class="codemirror">
                        <codemirror v-model="versionDetail.nginxContent" :options="cmOption2"></codemirror>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary"  @click="handleUpdate('updateForm')">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'codemirror/mode/nginx/nginx.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        let checkHostList = (rule, value, callback) => {
            if(!this.deployForm.groupId && !value) {
                 callback(new Error('服务器和服务器组至少选择一项'));
            } else {
                callback();
            }
        };
        let checkGroup = (rule, value, callback) => {
            if(this.deployForm.hostList.length === 0 && !value) {
                 callback(new Error('服务器和服务器组至少选择一项'));
            } else {
                callback();
            }
        };
        return {
            deployForm: {
                versionId: '',
                groupId: '',
                hostList: [],
                modId: '',
            },
            updateForm: {
                
            },
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-nginx-conf',
                theme: 'cobalt',
                readOnly: true,
            },
            cmOption2: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-nginx-conf',
                theme: 'cobalt',
                readOnly: true,
            },
            rules: {
                modId: [
                    {
                        required: true,
                        message: '请选择部署模块',
                        trigger: 'blur',
                    }
                ],
                hostList: [
                    {
                        validator: checkHostList,
                        trigger: 'blur'
                    }
                ],
                groupId: [
                    {
                        validator: checkGroup,
                        trigger: 'blur'
                    } 
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            versionDetail: 'versionModule/filterVersionDetail',
            filterHostList: 'hostModule/filterHostList',
            groupList: 'groupModule/filterGroupList',
            modList: 'modModule/filterModList'
        }),
        modalIsShow() {
            return this.$isShowModal('deployVersion');
        },
        updateModalIsShow() {
            return this.$isShowModal('updateVersion');
        }
    },
    methods: {
        ...mapActions({
            getHostListReq: 'hostModule/getHostList',
            getGroupListReq: 'groupModule/getGroupList',
            getVersionListReq: 'versionModule/getVersionList',
            getModListReq: 'modModule/getModList',
            deployVersionReq: 'operationModule/deployVersion',
            updateVersionReq: 'operationModule/updateVersion'
        }),
        closeModal() {
            this.$hideModal('deployVersion');
            this.$hideModal('updateVersion');
        },
        handleCloseModal() {
            this.deployForm = {
                versionId: '',
                groupId: '',
                hostList: [],
                modId: ''   
            };
            this.updateForm = {};
        },
        handleSelect() {
            this.getHostListReq({ currentPage: 1, pageSize: 1000 }).then(() => {
                this.deployForm.hostList = this.versionDetail.hosts || [];
            });
            this.getModListReq({ currentPage: 1, pageSize: 1000 }).then(() => {
                this.deployForm.modId = this.versionDetail.project.modId || '';
                // switch(this.versionDetail.project.frame) {
                //     case 1:
                //         this.deployForm.modId = 'java.default';
                //         break;
                //     case 2:
                //         this.deployForm.modId = 'vue.default';
                //         break;
                //     case 3:
                //         this.deployForm.modId = 'php.default';
                //         break;
                //     default:
                // }              
            });
            this.getGroupListReq({ currentPage: 1, pageSize: 1000 }).then(() => {
                this.deployForm.groupId = this.versionDetail.project.defaultGroupId;
            });
        },
        handleSelectMod() {
            this.getModListReq(this.$route.query);
        },
        handleNginxChange(value) {
            this.cmOption2.readOnly = value ? false : true;
        },
        handleSubmit(formName) {   
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.deployForm.commit = this.versionDetail.commit;
                    this.deployForm.configInfo = this.versionDetail.configInfo;
                    this.deployForm.configUpdate = this.versionDetail.configUpdate;
                    this.deployForm.sqlInfo = this.versionDetail.sqlInfo;
                    this.deployForm.sqlUrl = this.versionDetail.sqlUrl;
                    this.deployForm.versionId = this.versionDetail.versionId;
                    this.deployForm.nginxContent = this.versionDetail.nginxContent;
                    this.deployForm.nginxUpdate = this.versionDetail.nginxUpdate;
                    let params = this.$trim({
                        ...this.deployForm
                    });
                    if (!this.isUpdate) {
                        delete params.id;
                    }
                    this.deployVersionReq(params).then(() => {
                        const params = {
                            ...this.pagination
                        };
                        this.getVersionListReq(params);  
                    });
                }
            }); 
        },
        handleUpdate(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.updateForm.versionId = this.versionDetail.versionId;
                    this.updateForm.configInfo = this.versionDetail.configInfo;
                    this.updateForm.configUpdate = this.versionDetail.configUpdate;
                    this.updateForm.nginxContent = this.versionDetail.nginxContent;
                    this.updateForm.nginxUpdate = this.versionDetail.nginxUpdate;
                    let params = this.$trim({
                        ...this.updateForm
                    });
                    this.updateVersionReq(params).then(() => {
                        const params = {
                            ...this.pagination
                        };
                        this.getVersionListReq(params);
                        this.updateForm = {};
                    });
                }
            });   
        }
    },
};
</script>
