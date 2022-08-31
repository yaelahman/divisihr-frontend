<template>
    <div>
        <div class="app-content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="page-description">
                                <h1>Detail Penempatan</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <table id="datatable1" class="display" style="width:100%">
                                        <thead class="text-center">
                                            <tr>
                                                <th>Nama Personel</th>
                                                <th>PersonelID</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(val, index) in attendance_personels" :key="index">
                                                <td>{{ val.get_personel.m_personel_names }}</td>
                                                <td>{{ val.get_personel.m_personel_personID }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn btn-sm btn-light"
                                                        @click="confirmDelete(val.id_m_attendance_personel, val.get_personel.m_personel_names)">
                                                        <i class="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="mt-5">
                                        <router-link to="/attendance-spot" class="btn btn-light">
                                            <i class="material-icons">arrow_back</i>Kembali
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as Api from "../../helper/Api.js";
export default {
    data() {
        return {
            id: '',
            table: null,
            attendance_personels: {}
        }
    },
    created() {
        this.loadAttendancePersonel();
    },
    mounted() {
        this.id = this.$route.params.id
        this.id = this.id != null ? this.id : ''
        this.table = $("#datatable1").DataTable();
    },
    methods: {
        loadAttendancePersonel() {
            this.id = this.$route.params.id;
            this.id = this.id != null ? this.id : "";
            if (this.id != "") {
                this.$Progress.start()
                axios.get(env.VITE_API_URL + "index-attendance-personel/" + this.id).then((response) => {
                    if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                        this.$Progress.finish()
                        this.attendance_personels = response.data.data;
                        this.table.destroy();
                        this.$nextTick(() => {
                            this.table = $("#datatable1").DataTable();
                        });
                    }
                })
                    .catch((e) => {
                        this.$Progress.fail()
                        Api.messageError(e);
                    });
            }
        },
        confirmDelete(id, nama) {
            return Api.confirmDelete(
                "Apakah anda yakin?",
                "Personel " + nama + " di Attendance Personel akan dihapus!"
            ).then((result) => {
                if (result.isConfirmed) {
                    this.deleteAttendancePersonel(id);
                }
            });
        },
        deleteAttendancePersonel(id) {
            axios.delete(env.VITE_API_URL + "delete-attendance-personel/" + id).then((response) => {
                this.loadAttendancePersonel();
                let status = response.data.status;
                let message = response.data.message;
                let status_message = status == Api.STATUS_SUCCESS ? Api.MES_SUCESS : Api.MES_ERROR;
                Toast.fire({
                    icon: status_message,
                    title: message,
                });
            })
                .catch((e) => {
                    Api.messageError(e);
                });
        },
    },
}
</script>