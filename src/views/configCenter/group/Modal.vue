<template>
    <div>
        <el-dialog 
          :visible="modalIsShow" 
          :before-close="handleClose"
          center 
          :title="title" 
          width="45%"
          @close="handleClose"
        >
            <el-form
              ref="groupForm"
              :model="groupForm"
              :rules="rules"
              label-width="68px"
              :status-icon="true"
            >
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="name" label="名称" size="small">
                            <el-input v-model.trim="groupForm.name" placeholder="请输入分组名称" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item prop="description" label="说明" size="small">
                            <el-input
                              type="textarea"
                              rows="2"
                              v-model.trim="groupForm.description"
                              placeholder="请填写关于该分组的描述信息"
                              :maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="22">
                        <el-form-item prop="hostList" label="服务器">
                            <el-checkbox-group v-model="hosts">
                                <el-checkbox v-for="host in hostList" :label="host.hostId" :key="host.hostId">{{host.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col> -->
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="20" :offset="4">
                    <el-transfer
                      :titles="['可选', '已选']"
                      filterable
                      :filter-method="filterMethod"
                      filter-placeholder="请输入名称"
                      v-model="hosts"
                      :props="{key: 'hostId', label: 'name'}"
                      :data="hostList"
                    ></el-transfer>
                </el-col>
            </el-row>
            <div slot="footer">
                <el-button size="small" @click="handleClose">取 消</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="submitForm('groupForm')"
                  :loading="$isShowLoading('groupAddOrUpdate')"
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
            hosts: [],
            groupForm: {
                id: '',
                groupId: '',
                name: '',
                description: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入分组名称',
                        trigger: 'blur',
                    }
                ]
            }
        };
    },
    created() {
        this.getHostListReq({ currentPage: 1, pageSize: 1000 });
    },
    computed: {
        ...mapGetters({
            groupDetail: 'groupModule/filterGroupDetail',
            hostList: 'hostModule/filterHostList'
        }),
        title() {
            if (this.$isShowModal('updateGroup')) {
                return '更新分组';
            } else {
                return '添加分组';
            }
        },
        modalIsShow() {
            return this.$isShowModal('addGroup') || this.$isShowModal('updateGroup');
        },
        isUpdate() {
            return this.$isShowModal('updateGroup');
        }
    }, 
    methods: {
        ...mapActions({
            addOrUpdateGroup: 'groupModule/addOrUpdateGroup',
            getHostListReq: 'hostModule/getHostList'
        }),
        handleClose() {
            this.hosts = [];
            this.$refs['groupForm'].resetFields();
            if (this.isUpdate) {
                this.$hideModal('updateGroup');
            } else {
                this.$hideModal('addGroup');
            }
        },
        setValue() {
            const { id, groupId, name, description } = this.groupDetail;
            this.groupForm = { id, groupId, name, description };
            this.groupDetail.hosts.map(item => {
                this.hosts.push(item.hostId);
            });
        },
        filterMethod(query, item) {
            return item.name.indexOf(query) > -1;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = this.$trim({
                        ...this.groupForm,
                        hosts: this.hosts,
                        envId: 'test'
                    });
                    if (!this.isUpdate) {
                        delete data.id;
                    }
                    this.addOrUpdateGroup(data);
                }
            });
        }
    },
    watch: {
        groupDetail() {
            this.setValue();
        }
    }
};
</script>