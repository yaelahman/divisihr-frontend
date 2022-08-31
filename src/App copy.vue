<template>
    <div>
        <div v-if="!isLoggedIn">
            <router-view></router-view>
            <vue-progress-bar></vue-progress-bar>
        </div>
        <div v-else>
            <MainVue />
            <!-- WOI -->
        </div>
    </div>
</template>
<script>
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-responsive";
import MainVue from './views/Main.vue';
import vueProgressBar from "vue-progressbar"
export default {
    data() {
        return {
            isLoggedIn: false
        }
    },
    components: {
        MainVue,
        vueProgressBar
    },
    created() {
        this.isLoggedIn = this.$store.getters.isLoggedIn
    }
}
</script>
  