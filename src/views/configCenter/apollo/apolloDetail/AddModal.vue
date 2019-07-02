<template>
    <div> 
        <el-dialog
          :visible="modalIsShow"
          :before-close="handleClose"
          @close="handleClose"
          center
          title="添加NameSpace"
          width="50%"
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
                        <el-form-item class="namespace" prop="namespace" label="命名">
                            <el-input placeholder="请输入命名" v-model="form.namespace" class="input-with-select">
                                <el-select
                                slot="append"
                                v-model.trim="form.format"
                                placeholder="请选择格式"
                                size="small"
                                filterable
                                >
                                    <el-option
                                    style="width:130px"
                                    v-for="item in resouces.configFormat"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                    ></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="enable" label="是否启用">
                            <el-switch v-model.trim="form.enable"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item  prop="idc" label="机房">
                            <el-select
                                v-model.trim="form.idc"
                                style="width: 100%;"
                                placeholder="请选择机房"
                                size="small"
                                filterable
                            >
                                <el-option
                                    v-for="item in resouces.platforms"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="content" label="内容">
                            <div class="codemirror">
                                <codemirror style="font-size:16px;" v-model.trim="form.content" :options="cmOption"></codemirror>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                  type="primary"
                  @click="submitForm('form')"
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
               enable: true,
               idc: 'aliyun'
            },
            rules: {
                // business: [
                //     {
                //         required: true,
                //         message: '请填写业务名称',
                //         trigger: 'blur',
                //     }
                // ]
            }
        };
    },
    created() {
        this.getResoucesReq();
    },
    computed: {
        ...mapGetters({
             resouces: 'projectModule/resouces',
        }),
        modalIsShow() {
            return this.$isShowModal('addNameSpace');
        },
    },
    methods: {
        ...mapActions({
            addNameSpace: 'apolloModule/addNameSpace',
            getResoucesReq: 'projectModule/getResouces',
        }),
        handleClose() {
            this.$refs['form'].resetFields();
            this.$hideModal('addNameSpace');
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                this.form.configId = this.$route.query.configId;
                if (valid) {
                    let data = this.$trim({
                        ...this.form
                    });
                    this.addNameSpace(data);
                }
            });
        }
    },
    watch: {

    }
};
</script>

<style>
.namespace .el-select .el-input {
    width: 130px;
  }
.namespace .input-with-select .el-input-group__prepend {
background-color: #fff;
}
</style>
