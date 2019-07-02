<template>
    <div>
        <el-dialog
          title="编译任务"
          :visible="buildModalIsShow"
          width="38%"
          :before-close="closeModal"
          :close-on-click-modal="false"
          center
        >
            <el-table :data="buildTaskList" size="mini" ref border>
                <el-table-column property="buildId" label="jenkins任务"></el-table-column>
                <el-table-column property label="任务链接" width="380">
                    <template slot-scope="scope">
                        <a
                          :href="scope.row.project.jenkinsUrl+scope.row.buildId+'/console'"
                          target="blank"
                        >{{scope.row.project.jenkinsUrl+scope.row.buildId+"/console" }}</a>
                    </template>
                </el-table-column>
                <el-table-column property="buildStatus" label="编译状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.buildStatus === 'SUCCESS'" type="success">完成</el-tag>
                        <el-tag v-else-if="scope.row.buildStatus === 'FAILED'" type="warning">失败</el-tag>
                        <el-button v-else-if="scope.row.buildStatus === 'RUNNING'" :loading="true" type="text">编译中</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain
                        size="mini"
                        :loading="$isShowLoading('freshBuildStatus')"
                        @click="handleFresh(scope.row)"
                        v-if="scope.row.buildStatus === 'RUNNING'"
                        >
                            更新
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog 
          title="部署任务"
          :visible="deployModalIsShow"
          width="980px"
          :before-close="closeModal"
          :close-on-click-modal="false"
          center
        >
            <el-table :data="deployTaskList" size="mini" ref border>
                <el-table-column property="version.versionCode" label="版本号"></el-table-column>
                <el-table-column property="saltNode.name" label="管理节点" min-width="100px"></el-table-column>
                <el-table-column property="host.name" label="目标服务器"></el-table-column>
                <el-table-column property="host.privateIp" label="内网地址"></el-table-column>
                <el-table-column property="host.runas" label="runas"></el-table-column>
                <el-table-column property="jobId" label="任务ID" width="200">
                    <template slot-scope="scope">
                    <a @click="showJidDetail(scope.row)">{{ scope.row.jobId }}</a>
                </template>
                </el-table-column>
                <el-table-column property="status" label="部署状态">
                    <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 'SUCCESS'" type="success">完成</el-tag>
                    <el-tag v-else-if="scope.row.status === 'FAILED'" type="warning">失败</el-tag>
                    <el-button v-else-if="scope.row.status === 'RUNNING'" :loading="true" type="text">部署中</el-button>
                    <el-tag v-else-if="scope.row.status === 'WAITING'" type="info">等待部署</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button 
                      type="primary"
                      size="mini"
                      v-if="scope.row.status !== 'SUCCESS' && scope.row.status !== 'FAILED'"
                      plain
                      :loading="$isShowLoading('getJobStatus')"
                      @click="handleUpdate(scope.row)">更新
                    </el-button>
                </template>
            </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
          :title="title"
          :visible="$isShowModal('jobIdDetail')"
          @close="handleCloseModal"
          width="90%"
          class="jobdetail-dialog"
        >
            <span>
                <div v-if="emptyText === ''">
                    <div 
                      v-for="item in jobDetail"
                      :key="item.run_num"
                    >
                        <p>[{{item.run_num}}]  [{{item.start_time}}]  {{item.key}}  {{item.id}}  {{item.comment}}  {{item.stderr}}  {{item.duration}}  
                        <el-tag class="job-detail-tag" :type="item.result ? 'success' : 'danger'">{{ item.result ? 'SUCCESS' : 'FAILED' }}</el-tag></p>
                    </div>
                </div>
                <div v-else>
                    <h3 style="text-align:center">该数据无法解析，已为您显示原始数据！</h3>
                    <p>{{emptyText}}</p>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            title: '',
            jobDetail: [], 
            emptyText: ''
        };
    },
    computed: {
        ...mapGetters({
            buildTaskList: 'buildModule/filterBuildList',
            deployTaskList: 'deployModule/filterDeployList'
        }),
        buildModalIsShow() {
            return this.$isShowModal('buildDetail');
        },
        deployModalIsShow() {
            return this.$isShowModal('deployDetail');
        }
    },
    methods: {
        ...mapActions({
            freshBuildStatusReq: 'buildModule/freshBuildStatus',
            updateJobStatusReq: 'deployModule/updateJobStatus',
        }),
        showJidDetail(data) {
            this.title = '[' + data.minionId + '] ' + data.project.name + ' ' + data.version.versionCode;
            try {
                let result = JSON.parse(data.result);
                this.praseResult(result[data.minionId]);
                this.$showModal('jobIdDetail');
            } catch (error) {
                this.emptyText = data.result;
                this.$showModal('jobIdDetail');
            }
        },
        praseResult(data) {
            this.jobDetail = [];
            for (let key in data) {
                const keyName = key.split('|');
                const item = {
                    key: keyName[0] + keyName[3],
                    name: data[key]['name'],
                    result: data[key]['result'],
                    stderr: data[key]['changes']['stderr'],
                    duration: data[key]['duration'],
                    start_time: data[key]['start_time'],
                    run_num: data[key]['__run_num__'],
                    id: data[key]['__id__'],
                    comment: data[key]['comment'],
                };
                this.jobDetail.push(item);
            }
            this.jobDetail.sort((a, b) => a.run_num - b.run_num);
        },
        handleCloseModal() {
            this.$hideModal('jobIdDetail');
            this.emptyText = '';
        },
        handleFresh(data) {
            let datas = {
                ...data,
                origin: 'version'
            };
            this.freshBuildStatusReq(datas);
        },
        handleUpdate(data) {
            const param = {
                jobId: data.jobId,
                origin: 'version'
            };
            this.updateJobStatusReq(param);
        },
        closeModal() {
            this.$hideModal('buildDetail');
            this.$hideModal('deployDetail'); 
        }
    }
};
</script>
<style>
.jobdetail-dialog .el-dialog {
    background-color: #000;
}
.jobdetail-dialog .el-dialog__title {
    color:#fff;
}
.jobdetail-dialog h3, .jobdetail-dialog p {
    color:#fff;
}
.job-detail-tag {
    border: none;
    background-color: #000;
}
</style>