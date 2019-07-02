<template>
    <div> 
        <el-dialog
          :visible="modalIsShow"
          :before-close="handleClose"
          @close="handleClose"
          center
          :title="title"
          width="30%"
          :close-on-click-modal="false"
        >
            <el-form
              ref="clusterForm"
              :model="clusterForm"
              :rules="rules"
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
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                  type="primary"
                  @click="submitForm('clusterForm')"
                  :loading="$isShowLoading('clusterAddOrUpdate')"
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
            clusterForm: {
                clusterId: '',
                business: '',
                description: ''
            },
            rules: {
                business: [
                    {
                        required: true,
                        message: '请填写业务名称',
                        trigger: 'blur',
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            clusterDetail: 'clusterModule/filterClusterDetail'
        }),
        title() {
            if (this.$isShowModal('updateCluster')) {
                return '更新集群信息';
            } else {
                return '添加集群';
            }
        },
        modalIsShow() {
            return (
                this.$isShowModal('updateCluster') || this.$isShowModal('addCluster')
            );
        },
        isUpdate() {
            return this.$isShowModal('updateCluster');
        }
    },
    methods: {
        ...mapActions({
            addOrUpdateCluster: 'clusterModule/addOrUpdateCluster'
        }),
        handleClose() {
            this.$refs['clusterForm'].resetFields();
            if (this.isUpdate) {
                this.$hideModal('updateCluster');
            } else {
                this.$hideModal('addCluster');
            }
        },
        setValue() {
            const { clusterId, business, description } = this.clusterDetail;
            this.clusterForm = { clusterId, business, description };
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.clusterForm
                    });
                    if (!this.isUpdate) {
                        delete data.clusterId;
                    }
                    this.addOrUpdateCluster(data);
                }
            });
        }
    },
    watch: {
        clusterDetail() {
            this.setValue();
        }
    }
};
</script>