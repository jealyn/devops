<template>
   <div>
       <el-dialog
          :title="title"
          :visible="$isShowModal('jobIdDetail')"
          @open="handleOpenModal"
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
import { mapGetters } from 'vuex';

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
            data: 'deployModule/filterJidDetail'
        })
    },
    methods: {
        handleOpenModal() {
            let data = this.data;
            this.title = '[' + data.minionId + '] ' + data.project.name + ' ' + data.version.versionCode;
            //采用try...catch检测错误抛出
                try {
                    let result = JSON.parse(data.result);
                    this.praseResult(result[data.minionId]);
                } catch (error) {
                    this.emptyText = data.result;
                }
        },
        handleCloseModal() {
            this.$hideModal('jobIdDetail');
            this.emptyText = '';
        },
        //取出detail中的各项
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
            //按照编号从小到大排序
            this.jobDetail.sort((a, b) => a.run_num - b.run_num);
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