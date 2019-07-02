<template>
    <div class="layout-left">
        <div
            class="layout-logo"
            v-bind:class="{collapse: collapse}">
            <router-link to="/home">
                <img src="../../assets/images/logo.png">
            </router-link>
        </div>
        <el-menu
            class="layout-menu-left"
            :default-active="pathname"
            :unique-opened="true"
            :collapse="collapse">
            <template
                v-for="item in routers"
                v-if="!item.hidden && item.children && item.path.includes(routeKey)">
                <div
                    v-for="(menu, index) in item.children"
                    v-if="!menu.hidden && menu.children">
                    <el-menu-item
                        v-if="menu.children.length === 1 && !menu.children[0].children"
                        :index="`${item.path}/${menu.path}/${menu.children[0].path}`"
                        :key="index"
                        @click="handleLink(`${item.path}/${menu.path}/${menu.children[0].path}`)">
                        <i
                            v-if="menu.meta.icon"
                            :class="menu.meta.icon">
                        </i>
                        <span slot="title">{{menu.meta.title}}</span>
                    </el-menu-item>
                    <el-submenu
                        :index="menu.meta.title"
                        :key="menu.meta.title"
                        v-if="menu.children.length > 1">
                        <template slot="title">
                            <i :class="menu.meta.icon"></i>
                            <span slot="title">{{menu.meta.title}}</span>
                        </template>
                        <template
                            v-for="submenu in menu.children"
                            v-if="!submenu.hidden">
                            <el-menu-item
                                :index="`${item.path}/${menu.path}/${submenu.path.split('/:')[0]}`"
                                @click="handleLink(`${item.path}/${menu.path}/${submenu.path.split('/:')[0]}`)">
                                {{submenu.meta.title}}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </div>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { routes } from '@/routes';

    export default {
        computed: {
            collapse() {
                return this.$store.state.navCollapse;
            },
            routers() {
                return this.$store.getters.routes;
            },
            pathname() {
                return this.$route.path;
            },
            routeKey() {
                return this.$route.path.split('/')[1];
            }
        },
        methods: {
            /**
             * 路由跳转过滤参数
             * @param path {string} 路由
             */
            handleLink(path) {
                const linkPath = path.split('/:')[0];
                this.$router.push(linkPath);
            },
        }
    };
</script>