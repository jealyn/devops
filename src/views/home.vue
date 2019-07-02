<template>
    <div class="home-tip">
        <el-alert
            :title="$store.state.username + '，' + $t('welCome')"
            type="info"
            :closable="false">
        </el-alert>
    </div>
</template>

<style lang="less">
    .home-tip {
        .el-alert {
            padding: 15px 16px;
        }

        .el-alert__title {
            font-size: 18px;
        }
    }
</style>

<script>
    export default {};
</script>