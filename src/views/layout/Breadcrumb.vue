<template>
    <div class="layout-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumb"
                :key="item.name"
                v-if="item.meta.title"
            >
                {{item.meta.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        computed: {
            breadcrumb() {
                return this.$route.matched;
            }
        }
    };
</script>