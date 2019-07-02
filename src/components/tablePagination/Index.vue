<template>
    <div class="table-pagination">
        <el-pagination
            layout="total, prev, pager, next"
            :total="pagination.totalCount"
            :current-page.sync="pagination.currentPage"
            :page-size="pagination.pageSize"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'table-pagination',
        props: {
            pagination: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                pageObj: this.pagination
            };
        },
        methods: {
            handleCurrentChange(val) {
                const query = {
                    ...this.$route.query,
                    currentPage: val
                };

                this.$router.replace({ query });
            }
        },
        watch: {
            pagination: {
                immediate: true,
                handler(val) {
                    this.pageObj = val;
                }
            }
        }
    };
</script>

<style scoped>
    .table-pagination {
        margin: 20px 0 0 0;
        text-align: right;
    }
</style>