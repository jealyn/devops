<template>
    <div v-loading="$isShowLoading('modList')">
        <el-table :data="modList" border>
            <el-table-column prop="name" label="模板名称" ></el-table-column>
            <el-table-column label="模板内容">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleDisplayContent(scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small"  @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <table-pagination :pagination="pagination"></table-pagination>
        <el-dialog
          title="模板内容"
          :visible="$isShowModal('saltModContent')"
          @close="handleCloseModal"
          width="80%"
          top="5vh"
        >
            <div class="codemirror">
                <codemirror v-model="content" :options="cmOption"></codemirror>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/theme/cobalt.css';

export default {
    data() {
        return {
            content: '',
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: false,
                mode: 'text/x-yaml',
                theme: 'cobalt',
                readOnly: true,
            },
        };
    },
    computed: {
        ...mapGetters({
            modList: 'modModule/filterModList',
            pagination: 'modModule/pagination'
        })
    },
    methods: {
        ...mapActions({
            getDetail: 'modModule/getSaltModDetail'
        }),
        handleDisplayContent(data) {
            this.content = data.content;
            this.$showModal('saltModContent');
        },
        handleCloseModal() {
            this.$hideModal('saltModContent');
            this.content = '';
        },
        handleEdit(data) {
            this.getDetail(data);
            this.$showModal('updateSaltMod');
        },
    }
};
</script>