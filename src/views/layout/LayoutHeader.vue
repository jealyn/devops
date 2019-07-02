<template>
    <div class="layout-header">
        <img
            :src="nav_arrow"
            class="iconfont icon-collapse nav-control"
            @click="changeCollapse">
        <div class="header-menu">
            <ul>
                <li
                    v-for="item in headerMenu"
                    :key="item.key"
                    v-bind:class="routeKey === item.key ? 'active' : ''"
                    @click="handleMenuClick(item.key)">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class="layout-header-info">
            <span class="username">{{username}}</span>
            <el-button
                type="text"
                @click="handleLoginOut">
                退出
            </el-button>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import { loginOut } from '@/api/common';
    import { goLogin } from '@/utils';
    import nav_arrow from '@/assets/images/nav_arrow.png';

    export default {
        data() {
            return {
                nav_arrow,
                headerMenu: [
                    {
                        title: '配置中心',
                        key: 'configCenter',
                    },
                    {
                        title: '部署中心',
                        key: 'deployCenter',
                       
                    },
                ]
            };
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            routeKey() {
                return this.$route.path.split('/')[1];
            }
        },
        methods: {
            ...mapMutations({
                setCollapse: 'setCollapse'
            }),

            /**
             * 退出登录
             */
            async handleLoginOut() {
                window.sessionStorage.removeItem("username");
                this.$router.push("/login");
            },

            /**
             * 导航栏折叠
             */
            changeCollapse() {
                this.setCollapse();
            },

            /**
             * 头部导航栏点击进入第一个有权限的路由
             * @param key {String} 权限值,即路由第一个参数
             */
            handleMenuClick(key) {
                this.$store.getters.routes.map((data) => {
                    if (data.path.includes(key)) {
                        this.$router.push({
                            path: this.getPath(data)
                        });
                    }
                });
            },

            /**
             * 根据key获取当前第一个跳转路由
             * @param router {Object} 路由对象
             * @returns {boolean}
             */
            getPath(router) {
                let path = router.path;
                let routerArr = router.children;

                while (routerArr && routerArr.length > 0) {
                    path += `/${routerArr[0].path}`;
                    routerArr = routerArr[0].children;
                }

                return path;
            }
        }
    };
</script>