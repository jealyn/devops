<template>
    <div>
        <el-dialog 
          :visible="modalIsShow" 
          :before-close="handleClose"
          center 
          :title="title" 
          width="45%"
          top="0"
          style="height:100%"
          @close="handleClose"
        >
            <el-form
              ref="saltModForm"
              :model="saltModForm"
              :rules="rules"
              label-width="68px"
              :status-icon="true"
            >
                <el-row> 
                    <el-col :span="22">
                        <el-form-item prop="name" label="模板名称" size="small">
                            <el-input v-model.trim="saltModForm.name" placeholder="请输入模板名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row> 
                    <el-col :span="22">
                        <el-form-item prop="modKey" label="modKey" size="small">
                            <el-input v-model.trim="saltModForm.modKey" placeholder="请输入SLS模块名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="模板语言" prop="frame">
                            <el-select
                              v-model.trim="saltModForm.frame"
                              placeholder="请选择模板语言"
                              size="small"
                              style="width:100%"
                              filterable
                            >
                                <el-option
                                    v-for="item in filterFrame"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row> 
                    <el-col :span="22">
                        <el-form-item prop="description" label="说明" size="small">
                            <el-input type="textarea" autosize v-model.trim="saltModForm.description" placeholder="请输入模板描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row> 
                    <el-col :span="22">
                        <el-form-item prop="content" label="模板内容" size="small">
                            <div class="codemirror">
                                <codemirror v-model="saltModForm.content" :options="cmOption"></codemirror>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="22">
                        <el-form-item prop="platformId" label="云平台" size="small">
                            <el-select v-model.trim="saltModForm.platformId" placeholder="请选择云平台" filterable>
                                <el-option
                                    v-for="item in resouces.platforms"
                                    :value="item"
                                    :label="item"
                                    :key="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
            <div slot="footer">
                <el-button size="small" @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="submitForm('saltModForm')"
                    :loading="$isShowLoading('saltModAddOrUpdate')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        return {
            saltModForm: {
                id: '',
                name: '',
                content: '',
                description: '',
                frame: null,
            },
            filterFrame: [
                {
                    name: 'Java',
                    id: 1
                },
                {
                    name: 'Vue',
                    id: 2
                },
                {
                    name: 'PHP',
                    id: 3
                },
            ],
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-yaml',
                theme: 'cobalt',
            },
            rules: {
                // name: [
                //     {
                //         required: true,
                //         message: "请输入节点名称",
                //         trigger: "blur",
                //     }
                // ],
                // user: [
                //     {
                //         required: true,
                //         message: "请输入用户名",
                //         trigger: "blur",
                //     }
                // ]
            }
        };
    },
    created() {
        // this.getSaltNodeListReq({ ...this.$route.query });
    },
    computed: {
        ...mapGetters({
            filterDetail: 'modModule/filterSaltModDetail',
        }),
        isUpdate() {
            return this.$isShowModal("updateSaltMod");
        },
        title() {
            if (this.isUpdate) {
                return "编辑模板";
            } else {
                return "添加模板";
            }
        },
        modalIsShow() {
            return this.$isShowModal("addSaltMod") || this.$isShowModal("updateSaltMod");
        },
    },
    methods: {
        ...mapActions({
            addOrUpdateSaltMod: "saltNodeModule/addOrUpdateSaltMod",
            // getSaltNodeListReq: "saltNodeModule/getSaltNodeList"
        }),
        handleClose() {
            this.$refs["saltModForm"].resetFields();
            if (this.isUpdate) {
                this.$hideModal("updateSaltMod");
            } else {
                this.$hideModal("addSaltMod"); 
            }
        },
        setValue() {
            const { id, name, content, modKey, description, frame } = this.filterDetail;
            this.saltModForm = { id, name, content, modKey, description, frame };
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.saltModForm,
                    });
                    if (!this.isUpdate) {
                        delete data.id;
                    }
                    console.log(data);
                    
                    // this.addOrUpdateSaltMod(data);
                }
            });
        }
    },
    watch: {
        filterDetail() {
            this.isUpdate && this.setValue();
        }
    }
};
</script>

<style>
.CodeMirror {
    height: 75vh;
}
</style>
