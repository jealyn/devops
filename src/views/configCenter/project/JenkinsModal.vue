<template>
    <div>
        <el-dialog
          @open="handleFillGiturl"
          :visible="jenkinsModalIsShow"
          :before-close="handleCloseJenkins"
          @close="handleCloseJenkins"
          center
          :loading="$isShowLoading('addJenkins')"
          title="新增编译地址"
          width="40%"
          top="30vh"
          :close-on-click-modal="false"
        >
            <el-form
              ref="jenkinsForm"
              :model="jenkinsForm"
              :rules="rulesOfJenkins"
              label-width="100px"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="gitUrl" label="Git地址">
                            <el-input disabled v-model.trim="jenkinsForm.gitUrl" placeholder="请输入项目的Git地址" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="jobName" label="项目名称">
                            <el-input v-model.trim="jenkinsForm.jobName" placeholder="请输入项目名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="templateName" label="jenkins模板">
                            <el-select
                              style="width:100%"
                              filterable
                              v-model.trim="jenkinsForm.templateName"
                              placeholder="请选择编译模板"
                              @change="handleChange(jenkinsForm.templateName)"
                            >
                                <el-option
                                style="max-width:100%"
                                v-for="item in resouces.jenkinsTemplates"
                                :key="item.jobName"
                                :label="item.name"
                                :value="item.jobName"
                                ></el-option>
                            </el-select> 
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="command" label="构建脚本">
                            <div class="codemirror">
                                <codemirror v-model="jenkinsForm.command" :options="cmOption"></codemirror>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="description" label="描述">
                            <el-input v-model.trim="jenkinsForm.description" placeholder="请输入相关描述" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="handleCloseJenkins">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitJenkinsForm('jenkinsForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        return {
            jenkinsForm: {
                gitUrl: '',
                jobName: '',
                templateName: '',
                command: '',
                description: '',
            },
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'application/x-sh',
                theme: 'cobalt',
            },
            rulesOfJenkins: {
                gitUrl: [
                    {
                        required: true,
                        message: '请填写Git地址',
                        trigger: 'blur',
                    }
                ],
                jobName: [
                    {
                        required: true,
                        message: '请选择编译模板',
                        trigger: 'blur',
                    }
                ],
                command: [
                    {
                        required: true,
                        message: '请输入构建脚本',
                        trigger: 'blur',
                    }
                ],
                description: [
                    {
                        required: true,
                        message: '请输入相关描述',
                        trigger: 'blur',
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            'projectForm': state => state.projectModule.jenkinsParams
        }),
        ...mapGetters({
            resouces: 'projectModule/resouces',
            filterJenkinsDetail: 'projectModule/filterJenkinsDetail'
        }),
        jenkinsModalIsShow() {
            return this.$isShowModal('addJenkins');
        },
    },
    methods: {
        ...mapActions({
            addjenkins: 'projectModule/addjenkins',
            getJenkinsListReq: 'projectModule/getJenkinsList',
            getJenkinsDetailReq: 'projectModule/getJenkinsDetail',
        }),
        handleCloseJenkins() {
            this.$refs['jenkinsForm'].resetFields();
            this.$hideModal('addJenkins');
            this.getJenkinsList();
        },
        getJenkinsList() {
            this.getJenkinsListReq();
        },
        handleChange(data) {
            const params = {
                jobName: data,
            };
            this.getJenkinsDetailReq(params).then( () => {
                this.jenkinsForm.description = this.filterJenkinsDetail.description;
                this.jenkinsForm.command = this.filterJenkinsDetail.command;
            });
        },
        handleFillGiturl() {
            this.jenkinsForm.gitUrl = this.projectForm.gitUrl;
            this.jenkinsForm.jobName = this.projectForm.jobName;
        },
        submitJenkinsForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.jenkinsForm
                    });
                    this.addjenkins(data);
                }
            });
        },
    }
};
</script>

