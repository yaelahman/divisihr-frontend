<template>
    <div>
        <div class="app-content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="page-description">
                                <h1>Jadwal Karyawan</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <router-link to="/create-personel-time-work" class="btn btn-primary">
                                        <i class="material-icons">add</i>Tambah
                                    </router-link>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="datatable1" class="display nowrap w-100">
                                            <thead class="text-center text-nowrap">
                                                <tr>
                                                    <th style="text-align: start;">Nama</th>
                                                    <th>Departemen</th>
                                                    <th>Daftar Jadwal</th>
                                                    <th>Mulai</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="text-align: center;"
                                                    v-for="(personel_time_work, index) in personel_time_works"
                                                    :key="index">
                                                    <td style="width: 10px; text-align: start;">{{
                                                            personel_time_work.get_personel.m_personel_names
                                                    }}</td>
                                                    <td>{{ personel_time_work.get_personel.departemen != null ?
                                                            personel_time_work.get_personel.departemen.m_departemen_name :
                                                            '-'
                                                    }}</td>
                                                    <td>{{ personel_time_work.get_work_pattern.m_work_patern_name }}
                                                    </td>
                                                    <td>{{ convertDate(personel_time_work.m_work_personel_time) }}</td>
                                                    <td class="text-center">
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-sm btn-light"
                                                                data-toggle="tooltip" data-placement="right"
                                                                title="Edit">
                                                                <router-link
                                                                    :to="{ name: 'editPersonelTimeWork', params: { id: personel_time_work.id_m_work_personel, update: true } }"
                                                                    class="btn-light">
                                                                    <i class="material-icons">edit</i>
                                                                </router-link>
                                                            </button>
                                                            <button type="button" class="btn btn-sm btn-light"
                                                                data-toggle="tooltip" data-placement="right"
                                                                title="Hapus" @click="confirmDelete(
                                                                    personel_time_work.id_m_work_personel,
                                                                    personel_time_work.get_work_pattern.m_work_patern_name
                                                                )">
                                                                <i class="material-icons">delete</i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
            personel_time_works: {},
            table: null
        };
    },
    created() {
        this.loadPersonelTimeWork();
    },
    mounted() {
        this.table = $("#datatable1").DataTable({ autoWidth: false });
    },
    methods: {
        loadPersonelTimeWork() {
            this.$Progress.start()
            axios.get(env.VITE_API_URL + 'index-personel-time-work').then(response => {
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    this.$Progress.finish()
                    this.personel_time_works = response.data.data
                    this.table.destroy();
                    this.$nextTick(() => {
                        this.table = $('#datatable1').DataTable({ autoWidth: false });
                    });
                }
            })
                .catch(e => {
                    this.$Progress.fail()
                    Api.messageError(e)
                })
        },
        confirmDelete(id, name) {
            return Api.confirmDelete('Apakah anda yakin?', "Jadwal Karyawan dengan personel " + name + " akan dihapus!")
                .then((result) => {
                    if (result.isConfirmed) {
                        this.deleteCompany(id)
                    }
                })
        },
        deleteCompany(id) {
            axios.delete(env.VITE_API_URL + 'delete-personel-time-work/' + id).then(response => {
                this.loadPersonelTimeWork();
                let status = response.data.status
                let message = response.data.message
                let status_message = status == Api.STATUS_SUCCESS ? Api.MES_SUCESS : Api.MES_ERROR
                Toast.fire({
                    icon: status_message,
                    title: message
                })
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },
        convertDate(date, format = 'DD-MM-YYYY', empty = '-') {
            return Api.convertDate(date, format, empty)
        },
    }
};
</script>
