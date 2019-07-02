<template>
    <div>
        <el-dialog
          :visible="groupModalIsShow"
          :before-close="handleCloseGroup"
          @close="handleCloseGroup"
          center
          title="新增服务器分组"
          width="30%"
          top="30vh"
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
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            groupForm: {
                name: '',
                description: '',
                groupId: '',
            },
            rulesOfGroup: {
                name: [
                    {
                        required: true,
                        message: '请填写分组名称',
                        trigger: 'blur',
                    }
                ]
            },
        };
    },
    computed: {
        groupModalIsShow() {
            return this.$isShowModal('addGroupFromProject');
        },
    },
    methods: {
        ...mapActions({
            addGroup: 'groupModule/addGroup', 
        }),
        handleCloseGroup() {
            this.$refs['groupForm'].resetFields();
            this.$hideModal('addGroupFromProject');
        },
        submitGroupForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.groupForm,
                        origin: 'project',
                        envId: 'test'
                    });
                    this.addGroup(data);
                }
            });
        },
    }
};
</script>

