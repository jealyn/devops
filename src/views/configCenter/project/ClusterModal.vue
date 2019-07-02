<template>
    <div>
        <el-dialog
          :visible="clusterModalIsShow"
          :before-close="handleCloseCluster"
          @close="handleCloseCluster"
          center
          title="新增集群分组"
          width="30%"
          top="30vh"
          :close-on-click-modal="false"
        >
            <el-form
              ref="clusterForm"
              :model="clusterForm"
              :rules="rulesOfCluster"
              label-width="100px"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="business" label="业务名称">
                            <el-input v-model.trim="clusterForm.business" placeholder="请输入业务名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="description" label="说明">
                            <el-input
                              type="textarea"
                              rows="2"
                              v-model.trim="clusterForm.description"
                              placeholder="请输入该业务的相关描述信息"
                              :maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="handleCloseCluster">取 消</el-button>
                <el-button
                  type="primary"
                  @click="submitClusterForm('clusterForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            clusterForm: {
                business: '',
                description: ''
            },
            rulesOfCluster: {
                business: [
                    {
                        required: true,
                        message: '请填写业务名称',
                        trigger: 'blur',
                    }
                ]
            },
        };
    },
    computed: {
        clusterModalIsShow() {
            return this.$isShowModal('addClusterFromProject');
        },
    },
    methods: {
        ...mapActions({
            addCluster: 'clusterModule/addCluster',
        }),
        handleCloseCluster() {
            this.$refs['clusterForm'].resetFields();
            this.$hideModal('addClusterFromProject');
        },
        submitClusterForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.clusterForm
                    });
                    this.addCluster(data);
                }
            });
        },
    }
};
</script>

