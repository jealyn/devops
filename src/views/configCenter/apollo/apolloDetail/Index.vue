<template>
    <div>
        <detail></detail>
        <AddModal></AddModal>
    </div>
</template>

<script>
import Detail from './Detail.vue';
import AddModal from './AddModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
       Detail,
       AddModal
    },
    created() {
        
    },
    computed: {
        query() {
            return this.$route.query;
        }
    },
    methods: {
        ...mapActions({
            
        }),
    },
    watch: {
        query() {
           
        }
    }
};
</script>