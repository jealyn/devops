<template>
    <div class="layout">
        <side-bar></side-bar>
        <div class="layout-right" v-bind:class="{collapse: collapse}">
            <LayoutHeader></LayoutHeader>
            <div class="layout-content-card">
                <Breadcrumb></Breadcrumb>
                <LayoutContent></LayoutContent>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    @import 'Layout.less';
</style>

<script>
    import { mapMutations, mapActions } from 'vuex';

    import LayoutHeader from './LayoutHeader.vue';
    import Breadcrumb from './Breadcrumb.vue';
    import SideBar from './Side.vue';
    import LayoutContent from './LayoutContent.vue';

    export default {
        components: {
            LayoutHeader,
            Breadcrumb,
            SideBar,
            LayoutContent
        },
        computed: {
            path() {
                return this.$route.path;
            },
            collapse() {
                return this.$store.state.navCollapse;
            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            ...mapMutations({
                closeLoading: 'closeLoading'
            }),
            ...mapActions({
                getUserInfo: 'getAdminUserInfo'
            }),
        },
        watch: {
            path() {
                this.closeLoading();
            }
        }
    };
</script>