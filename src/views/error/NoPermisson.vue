<template>
    <div class="errPage-container">
        <el-button type="primary" @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo text-ginormous">Oops!</h1>
                <h2>你没有权限去该页面</h2>
                <h6>如有不满请联系管理员</h6>
                <ul class="list-unstyled">
                    <li>或者你可以去:</li>
                    <li class="link-type">
                        <router-link to="/home">回首页</router-link>
                    </li>
                    <li class="link-type" @click="loginOut">
                        <a href="javascript:void (0)">退出登录</a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import errGif from '@/assets/images/401.gif';

    export default {
        data() {
            return {
                errGif: errGif,
            };
        },
        methods: {
            back() {
                this.$goBack('/home');
            },
            loginOut() {
                alert('退出点击！');
            }
        }
    };
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .errPage-container {
        width: 800px;
        margin: 100px auto;
        .pan-gif {
            margin: 0 auto;
            display: block;
        }
        .pan-img {
            display: block;
            margin: 0 auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
        }
        .list-unstyled {
            font-size: 14px;
            li {
                padding-bottom: 5px;
            }
            a {
                color: #20a0ff;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>