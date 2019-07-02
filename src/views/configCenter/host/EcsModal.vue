<template>
    <el-dialog :visible="modalIsShow" :before-close="handleClose" center title="批量添加" width="35%"></el-dialog>
</template>

<script>
export default {
    computed: {
        modalIsShow() {
            return this.$isShowModal("addEcsBatch");
        }
    },
    methods: {
        handleClose() {
            return this.$hideModal("addEcsBatch");
        }
    }
};
</script>