<template>
    <div>
        <el-dialog 
          :visible="modalIsShow" 
          :before-close="handleClose"
          center 
          :title="title" 
          width="30%"
          @close="handleClose"
        >
            <el-form
              ref="saltNodeForm"
              :model="saltNodeForm"
              :rules="rules"
              label-width="68px"
              :status-icon="true"
            >
                <el-row> 
                    <el-col :span="22">
                        <el-form-item prop="name" label="名称" size="small">
                            <el-input v-model.trim="saltNodeForm.name" placeholder="请输入节点名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="baseUrl" label="BaseUrl" size="small">
                            <el-input
                              v-model.trim="saltNodeForm.baseUrl"
                              placeholder="请输入节点地址"
                              :maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="authType" label="认证类型" size="small">
                            <el-input v-model.trim="saltNodeForm.authType" placeholder="请输入认证类型" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="platformId" label="云平台" size="small">
                            <el-select v-model.trim="saltNodeForm.platformId" placeholder="请选择云平台" filterable>
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
                    <el-col :span="22">
                        <el-form-item prop="user" label="用户" size="small">
                            <el-input v-model.trim="saltNodeForm.user" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="password" label="密码" size="small">
                            <el-input v-model.trim="saltNodeForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="description" label="说明" size="small">
                            <el-input  type="textarea" :rows="2" v-model.trim="saltNodeForm.description" placeholder="请填写关于此节点的描述信息"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button size="small" @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="submitForm('saltNodeForm')"
                    :loading="$isShowLoading('nodeAddOrUpdate')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            saltNodeForm: {
                id: "",
                name: "",
                baseUrl: "",
                authType: "",
                description: "",
                platformId: '',
                user: '',
                password: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入节点名称",
                        trigger: "blur",
                    }
                ],
                user: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    }
                ]
            }
        };
    },
    created() {
        this.getSaltNodeListReq({ ...this.$route.query }); 
        this.getResoucesReq();
    },
    computed: {
        ...mapGetters({
            saltNodeDetail: "saltNodeModule/filterSaltNodeDetail",
            resouces: 'projectModule/resouces'
        }),
        title() {
            if (this.$isShowModal("updateSaltNode")) {
                return "更新节点";
            } else {
                return "添加节点";
            }
        },
        modalIsShow() {
            return this.$isShowModal("addSaltNode") || this.$isShowModal("updateSaltNode");
        },
        isUpdate() {
            return this.$isShowModal("updateSaltNode");
        }
    },
    methods: {
        ...mapActions({
            addOrUpdateSaltNode: "saltNodeModule/addOrUpdateSaltNode",
            getSaltNodeListReq: "saltNodeModule/getSaltNodeList",
            getResoucesReq: 'projectModule/getResouces'
        }),
        handleClose() {
            this.$refs["saltNodeForm"].resetFields();
            if (this.isUpdate) {
                this.$hideModal("updateSaltNode");
            } else {
                this.$hideModal("addSaltNode"); 
            }
        },
        setValue() {
            const { id, name, baseUrl, authType, description, platformId, saltNodeId } = this.saltNodeDetail;
            this.saltNodeForm = { id, name, baseUrl, authType, description, platformId, saltNodeId };
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.saltNodeForm,
                    });
                    if (!this.isUpdate) {
                        delete data.id;
                    }
                    this.addOrUpdateSaltNode(data);
                }
            });
        }
    },
    watch: {
        saltNodeDetail() {
            this.setValue();
        }
    }
};
</script>