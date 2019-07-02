<template>
    <el-card shadow="never" class="query-form">
        <el-form :inline="true" label-width="80px" :model="form" onsubmit="return false">
            <el-form-item label="选择模板">
                <el-select 
                    v-model.trim="form.modKey" 
                    placeholder="请选择模板" 
                    clearable 
                >
                    <el-option
                        v-for="item in filterModSelect"
                        :key="item.modKey"
                        :label="item.name"
                        :value="item.modKey">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="getList(form)">查询</el-button>
            </el-form-item>
            <el-form-item> 
                <el-button
                  type="info"
                  icon="el-icon-circle-plus-outline"
                  size="small"
                  @click="$showModal('addSaltMod')"
                >新建</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            form: {}
        };
    },
    computed: {
        ...mapGetters({
            filterModSelect: 'modModule/filterSaltModSelect',
        })
    },
    methods: {
        ...mapActions({
            getModListReq: 'modModule/getModList',
        }),
        getList() {
            const query = this.$formatSearchData(this.form);
            this.getModListReq(query);
            this.$router.replace( { query });
        }
    }
};
</script>