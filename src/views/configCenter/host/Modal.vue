<template>
    <div>
        <el-dialog
          :visible="modalIsShow"
          :before-close="handleClose"
          @close="handleClose"
          center
          :title="title"
          width="35%"
        >
            <el-form
              ref="hostForm"
              :model="hostForm"
              :rules="rules"
              label-width="80px"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="name" label="名称" size="small">
                            <el-input v-model.trim="hostForm.name" placeholder="请输入服务器名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="isAliyun" label="ali ECS" size="small">
                            <el-switch v-model.trim="isAliyun" :disabled="isUpdate"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item prop="ecsId" label="ecsId" size="small" v-if="isAliyun">
                            <el-input v-model.trim="ecsId" @blur="getEcsInfo" placeholder="请输入实例ID" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="privateIp" label="内网ip" size="small">
                            <el-input v-model.trim="hostForm.privateIp" placeholder="请输入内网ip地址" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item prop="publicIp" label="公网ip" size="small">
                            <el-input v-model.trim="hostForm.publicIp" placeholder="请输入公网ip地址" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
              </el-row>
              <el-row>
                    <el-col :span="11">
                        <el-form-item prop="platformId" label="云平台" size="small">
                            <el-select v-model.trim="hostForm.platformId" placeholder="请选择云平台" filterable>
                                <el-option
                                    v-for="item in resouces.platforms"
                                    :value="item"
                                    :label="item"
                                    :key="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
              </el-row>
              <el-row>
                    <el-col :span="11">
                        <el-form-item prop="saltNodeId" label="所属节点" size="small">
                            <template slot-scope="scope">
                                <el-select v-model.trim="hostForm.saltNodeId" placeholder="请选择管理节点" filterable>
                                    <el-option
                                        v-for="item in saltNodeList"
                                        :value="item.saltNodeId"
                                        :label="item.name"
                                        :key="item.saltNodeId"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item prop="runas" label="执行用户" size="small">
                            <el-input v-model.trim="hostForm.runas" placeholder="请输入程序管理用户" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="hostname" label="HostName" size="small">
                            <el-input v-model.trim="hostForm.hostname" placeholder="请输入Host Name" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item prop="minionId" label="minionId" size="small">
                            <el-input v-model.trim="hostForm.minionId" placeholder="请输入节点标识" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="23">
                        <el-form-item prop="description" label="说明" size="small">
                            <el-input
                                v-model.trim="hostForm.description"
                                type="textarea"
                                placeholder="请填写一些备注信息"
                                :maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="17">
                        <el-form-item label="分组">
                            <template slot-scope="scope">
                                <el-select style="width:100%" v-model="groups" placeholder="请选择分组" filterable multiple>
                                    <el-option
                                    style="max-width:100%"
                                    v-for="item in groupList"
                                    :key="item.groupId"
                                    :label="item.name"
                                    :value="item.groupId"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item size="small">
                            <el-button type="text" @click="handleCreateGroup">创建服务器组</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button size="small" @click="handleClose">取 消</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="submitForm('hostForm')"
                  :loading="$isShowLoading('hostAddOrUpdate')"
                >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :visible="groupModalIsShow"
            :before-close="handleCloseGroup"
            @close="handleCloseGroup"
            center
            title="新增服务器分组"
            width="30%"
            top="25vh"
            :close-on-click-modal="false"
        >
            <el-form
                ref="groupForm"
                :model="groupForm"
                :rules="rulesOfGroup"
                label-width="100px"
                :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="name" label="名称">
                            <el-input v-model.trim="groupForm.name" placeholder="请输入分组名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="description" label="说明">
                            <el-input
                                type="textarea"
                                rows="2"
                                v-model.trim="groupForm.description"
                                placeholder="请填写关于该分组的描述信息"
                                :maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="handleCloseGroup">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitGroupForm('groupForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            groups: [],
            ecsId: '',
            isAliyun: false,
            hostForm: {
                id: '',
                hostId: '',
                name: '',
                privateIp: '',
                publicIp: '',
                platformId: '',
                saltNodeId: '',
                hostname: '',
                minionId: '',
                online: false,
                runas: '',
                description: '',
                envId: 'test'
            },
            groupForm: {
                name: '',
                description: '',
                groupId: ''
            },
            rules: {
                saltNodeId: [
                    {
                        required: true,
                        message: '请选择所属节点',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入服务器名称',
                        trigger: 'blur'
                    }
                ],
                platformId: [
                    {
                        required: true,
                        message: '请输入云平台',
                        trigger: 'blur'
                    }
                ],
                runas: [
                    {
                        required: true,
                        message: '请输入程序管理用户',
                        trigger: 'blur'
                    }
                ],
                privateIp: [
                    {
                        required: true,
                        message: '请输入内网IP地址',
                        trigger: 'blur'
                    }
                ],
                minionId: [
                    {
                        required: true,
                        message: '请输入节点标识',
                        trigger: 'blur'
                    }
                ]
            },
            rulesOfGroup: {
                name: [
                    {
                        required: true,
                        message: '请填写分组名称',
                        trigger: 'blur',
                    }
                ]
            }
        };
    },

    computed: {
        ...mapGetters({
            hostDetail: 'hostModule/filterHostDetail',
            saltNodeList: 'saltNodeModule/filterSaltNodeList',
            ecsDetail: 'hostModule/filterEcsDetail',
            groupList: 'groupModule/filterGroupList',
            resouces: 'projectModule/resouces'
        }),
        title() {
            if (this.$isShowModal('updateHost')) {
                return '更新服务器';
            } else {
                return '添加服务器';
            }
        },
        modalIsShow() {
            return this.$isShowModal('addHost') || this.$isShowModal('updateHost');
        },
        isUpdate() {
            return this.$isShowModal('updateHost');
        },
        groupModalIsShow() {
            return this.$isShowModal('addGroupFromHost');
        },
    },

    created() {
        this.getNodeListReq({ currentPage: 1, pageSize: 1000 });
        this.getGroupListReq({ currentPage: 1, pageSize: 1000 });
    },
    methods: {
        ...mapActions({
            addOrUpdateHost: 'hostModule/addOrUpdateHost',
            getEcsInfoReq: 'hostModule/getEcsInfo',
            getNodeListReq: 'saltNodeModule/getSaltNodeList',
            getDetail: 'hostModule/getHostDetail',
            getGroupListReq: 'groupModule/getGroupList',
            addGroup: 'groupModule/addGroup'
        }),
        handleClose() {
            this.groups = [];
            this.$refs['hostForm'].resetFields();
            if (this.isUpdate) {
                this.$hideModal('updateHost');
            } else {
                this.$hideModal('addHost');
            }
        },
        setValue() {
            const {
                id,
                hostId,
                name,
                privateIp,
                publicIp,
                platformId,
                saltNodeId,
                hostname, 
                minionId,
                online,
                runas,
                description,
                envId
            } = this.hostDetail;
            this.hostForm = {
                id,
                hostId,
                name,
                privateIp,
                publicIp,
                platformId,
                saltNodeId,
                hostname,
                minionId,
                online,
                runas,
                description,
                envId
            };
            this.hostDetail.groups.map(item => {
                this.groups.push(item.groupId);
            });
        },
        handleCloseGroup() {
            this.$refs['groupForm'].resetFields();
            this.$hideModal('addGroupFromHost');
        },
        getNodeList() {
            const params = { ...this.$route.query };
            this.getNodeListReq(params);
        },
        handleCreateGroup() {
            this.$showModal('addGroupFromHost');
        },
        getEcsInfo() {
            this.getEcsInfoReq({ ecsId: this.ecsId });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.hostForm,
                        groups: this.groups
                    });
                    if (!this.isUpdate) {
                        delete data.id;
                    }
                    this.addOrUpdateHost(data);
                }
            });
        },
        submitGroupForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.groupForm,
                        origin: 'host',
                        envId: 'test'
                    });
                    this.addGroup(data);
                }
            });
        },
    },
    watch: {
        hostDetail: {
            handler() {
                this.setValue();
            },
            immediate: false
        },
        ecsDetail() {
            this.hostForm.privateIp = this.ecsDetail.privateIp;
            this.hostForm.publicIp = this.ecsDetail.publicIp;
            this.hostForm.name = this.ecsDetail.name;
            this.hostForm.hostname = this.ecsDetail.hostname;
        }
    }
};
</script>