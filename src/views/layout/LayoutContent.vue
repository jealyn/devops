<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <transition name="fade" mode="out-in">
                <router-view>
                </router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
            }
        }
    };
</script>