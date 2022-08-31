

import { createApp } from 'vue'
// import { BootstrapVue3 } from 'bootstrap-vue-3'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from 'sweetalert2'
import common from './helper/common'
// import vueProgressbar from 'vue-progressbar'
import VueProgressBar from "@aacassandra/vue3-progressbar"
import VueApexCharts from "vue3-apexcharts";
import DataTable from 'datatables.net-vue3';
import DataTableBs4 from "datatables.net-bs4"
// import VueGoogleMaps from '@fawmi/vue-google-maps'
// import VueSimpleAlert from "vue-simple-alert";
import lodash from "lodash"
import jQuery from 'jquery'
import popperJS from "popper.js"

import axios from 'axios'

window.env = import.meta.env

// localStorage.removeItem('token')
window.axios = axios
window.Swal = Swal
// window.$ = window.jQuery = jQuery

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            // alert('woi')
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})
const app = createApp(App)

app.use(store)
app.use(router)
app.mixin(common)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

// app.use(VueSimpleAlert);
app.use(VueProgressBar, {
    color: 'rgb(2, 117, 216)',
    failedColor: 'red',
    height: '2px'
})
app.component("apexchart", VueApexCharts);
// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyCWjSQkpYWRMa93lsB6UbQ8jeEWtH7J43s',
//         libraries: 'places',
//     }
// });

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
})
window.Toast = Toast

app.mount('#app')
