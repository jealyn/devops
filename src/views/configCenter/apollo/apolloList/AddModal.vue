<template>
    <div> 
        <el-dialog
          :visible="modalIsShow"
          :before-close="handleClose"
          @close="handleClose"
          center
          title="添加配置"
          width="30%"
          :close-on-click-modal="false"
        >
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="100px"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="configId" label="configId">
                            <el-input v-model.trim="form.configId" placeholder="请输入configId" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="name" label="名称">
                            <el-input v-model.trim="form.name" placeholder="请输入名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="语言" prop="frame">
                            <el-select
                              v-model.trim="form.frame"
                              placeholder="请选择项目语言"
                              size="small"
                              style="width:100%"
                              filterable
                            >
                                <el-option
                                  style="max-width:100%"
                                  v-for="item in filterFrameList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="22">
                        <el-form-item prop="enable" label="是否启用">
                            <el-switch v-model.trim="form.configNamespace[0].enable"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="content" label="内容">
                            <div class="codemirror">
                                <codemirror style="font-size:16px;" v-model.trim="form.configNamespace[0].content" :options="cmOption"></codemirror>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
            <div slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                  type="primary"
                  @click="submitForm('form')"
                  :loading="$isShowLoading('clusterAddOrUpdate')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'codemirror/mode/nginx/nginx.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        return {
            filterFrameList: [
                { id: 1, name: 'JAVA' }, { id: 2, name: 'Node' }, { id: 3, name: 'PHP' }
            ],
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-nginx-conf',
                theme: 'cobalt',
                readOnly: false,
            },
            form: {
                
            },
            rules: {
                configId: [
                    {
                        required: true,
                        message: '请填写configId',
                        trigger: 'blur',
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请填写名称',
                        trigger: 'blur',
                    }
                ],
                frame: [
                    {
                        required: true,
                        message: '请选择语言',
                        trigger: 'blur',
                    }
                ],
            }
        };
    },
    computed: {
        modalIsShow() {
            return this.$isShowModal('addApollo');
        },
    },
    methods: {
        ...mapActions({
            addApollo: 'apolloModule/addApollo'
        }),
        handleClose() {
            this.$refs['form'].resetFields();
            this.$hideModal('addApollo');
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.form
                    });
                    this.addApollo(data);
                }
            });
        }
    },
    watch: {

    }
};
</script>