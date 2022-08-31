<template>
    <div>
        <div class="app-content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="page-description">
                                <h1> Izin Cuti</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <form @submit.prevent="filterRangeDate()">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label>Start Date</label>
                                                <input type="date" class="form-control start-date"
                                                    placeholder="Start Date" v-model="search.startDate"
                                                    @click="search.endDate = ''" required />
                                            </div>
                                            <div class="col-sm-3">
                                                <label>End Date</label>
                                                <input type="date" class="form-control" placeholder="End Date"
                                                    :min="search.startDate" v-model="search.endDate"
                                                    :disabled="search.startDate == ''" required />
                                            </div>
                                            <div class="col-sm-3">
                                                <label>Status</label>
                                                <select v-model="search.status" class="form-control">
                                                    <option value="">Semua</option>
                                                    <option value="0">Menunggu Persetujuan</option>
                                                    <option value="1">Diterima</option>
                                                    <option value="2">Ditolak</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3" style="margin-top: 1.8rem;">
                                                <button class="btn btn-primary" style="width: 120px;"
                                                    @click="filterType = 'show'">Tampilkan</button>
                                                <button class="btn btn-primary" style="width: 120px;"
                                                    @click="filterType = 'download'">
                                                    Unduh
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3.75 19.5H20.25C20.4489 19.5 20.6397 19.579 20.7803 19.7197C20.921 19.8603 21 20.0511 21 20.25C21 20.4489 20.921 20.6397 20.7803 20.7803C20.6397 20.921 20.4489 21 20.25 21H3.75C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25C3 20.0511 3.07902 19.8603 3.21967 19.7197C3.36032 19.579 3.55109 19.5 3.75 19.5ZM12.75 13.554L18.288 8.0145L19.3485 9.075L11.925 16.5L4.5 9.075L5.5605 8.0145L11.25 13.704V3H12.75V13.554Z"
                                                            fill="white" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="datatable1" class="display nowrap w-100">
                                            <thead class="text-center text-nowrap">
                                                <tr>
                                                    <th>No</th>
                                                    <th style="text-align: start;">Nama</th>
                                                    <th>Departemen</th>
                                                    <th>Tanggal Pengajuan</th>
                                                    <th>Jumlah Hari</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="text-align: center" v-for="(val, index) in permits"
                                                    :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td style="text-align: start;">
                                                        {{ val.personel.m_personel_names }}
                                                    </td>
                                                    <td>
                                                        {{ val.personel.departemen.m_departemen_name }}
                                                    </td>
                                                    <td v-if="val.created_at != null">
                                                        {{ convertDate(val.created_at) }}
                                                    </td>
                                                    <td v-else class="text-center">-</td>
                                                    <td>
                                                        {{ jumlahHari(val) }}
                                                    </td>
                                                    <td class="text-nowrap">
                                                        <div v-html="mapStatus(val.permit_status)"></div>
                                                    </td>
                                                    <td class="w-100 d-flex justify-content-start">
                                                        <div class="btn-group">
                                                            <router-link :to="{
                                                                name: 'detailIzinCuti',
                                                                params: {
                                                                    id: val.id_permit_application,
                                                                },
                                                            }" class="btn btn-sm btn-light" data-toggle="tooltip"
                                                                data-placement="right" title="Detail">
                                                                <i class="material-icons">remove_red_eye</i>
                                                            </router-link>
                                                            <button type="button" class="btn btn-sm btn-light"
                                                                data-toggle="tooltip" data-placement="right"
                                                                title="Hapus" @click="
                                                                    confirmDelete(
                                                                        val.id_permit_application,
                                                                    )
                                                                ">
                                                                <i class="material-icons">delete</i>
                                                            </button>
                                                            <div v-if="val.permit_status == 0"
                                                                style="display: contents">
                                                                <button type="button" class="btn btn-sm btn-light"
                                                                    data-toggle="tooltip" data-placement="right"
                                                                    title="Setuju" data-bs-toggle="modal"
                                                                    data-bs-target="#ModalCatatan"
                                                                    @click="Modal(val.id_permit_application, 'setuju')">
                                                                    <i class="material-icons">check</i>
                                                                </button>
                                                                <button type="button" class="btn btn-sm btn-light"
                                                                    data-toggle="tooltip" data-placement="right"
                                                                    title="Tolak" data-bs-toggle="modal"
                                                                    data-bs-target="#ModalCatatan"
                                                                    @click="Modal(val.id_permit_application, 'tolak')">
                                                                    <i class="material-icons">close</i>
                                                                </button>
                                                            </div>
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
        <div class="modal fade" id="ModalCatatan" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="text-center">Silahkan input catatan dari admin pada kolom di bawah ini:</p>
                    </div>
                    <div class="mx-5">
                        <textarea class="form-control" v-model="data.catatan" cols="30" rows="10"
                            placeholder="Catatan dari admin"></textarea>
                    </div>
                    <div class="modal-footer text-center">
                        <div class="mx-auto">
                            <button type="button" class="btn rounded-pill btn-light me-2 btn-cancel"
                                data-bs-dismiss="modal">
                                Kembali
                            </button>
                            <button type="button" @click="permitApprove()"
                                class="btn rounded-pill btn-primary btn-submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import * as Api from "../../../helper/Api.js";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            permits: {},
            personels: {},
            table: null,
            edit: null,
            search: {
                t_absensi_Dates: "",
                startDate: '',
                status: ''
            },
            data: {
                catatan: "",
                type: "",
                id: "",
            },
            filterType: null,
            // table: null
        };
    },
    async created() {
        this.$Progress.start();
        await this.loadPermits();
        // this.getDateNow();
    },
    mounted() {
        this.table = $("#datatable1").DataTable({ autoWidth: false });
    },
    methods: {
        getDateNow() {
            const today = new Date();
            this.search.t_absensi_Dates = moment(today).format("YYYY-MM-DD");
        },
        jumlahHari(val) {
            var start = val.permit_startclock
            var end = val.permit_endclock
            if (start != null) {

                var a = moment(moment(start).toArray());
                var b = moment(moment(end).toArray());
                var result = b.diff(a, 'd')
                return (result < 0 ? 0 : result + 1) + ' Hari'
            }
            return val.permit_date.length + ' Hari'
        },
        mapStatus(status) {
            switch (status) {
                case 0:
                    return '<span class="text-muted">Menunggu Persetujuan</span>'
                    break;
                case 1:
                    return '<span class="text-success">Diterima</span>'
                    break;
                case 2:
                    return '<span class="text-danger">Ditolak</span>'
                    break;
                default:
                    break;
            }
        },
        Modal(id, type = '') {
            this.data = {
                id: id,
                type: type
            }
        },
        permitApprove(type = null) {
            if (type != null) {
                this.data.id = this.id
                this.data.type = type
            }
            $('.btn-submit').attr('disabled', true)
            // $('.btn-submit').attr('disabled', true)
            axios
                .post(env.VITE_API_URL + "izin/approve", this.data)
                .then((response) => {
                    this.loadPermits();
                    let status = response.data.status;
                    let message = response.data.message;
                    let status_message =
                        status == Api.STATUS_SUCCESS ? Api.MES_SUCESS : Api.MES_ERROR;
                    Toast.fire({
                        icon: status_message,
                        title: message,
                    });
                    $('.btn-submit').attr('disabled', false)
                    $('.btn-cancel').trigger('click')
                })
                .catch((e) => {
                    Api.messageError(e);
                    $('.btn-submit').attr('disabled', false)
                });
        },
        filterRangeDate() {
            if (this.filterType == 'show') {
                var a = moment(moment(this.search.startDate).toArray());
                var b = moment(moment(this.search.endDate).toArray());
                if (b.diff(a, 'days') + 1 < 31) {
                    this.loadPermits()
                } else {
                    Swal.fire({
                        title: "Perhatian",
                        text: 'Selisih tanggal melebihi dari 30 hari harap gunakan unduh',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    })
                }
            } else {

                Swal.fire({
                    title: "Ekspor Izin Cuti",
                    text: 'Ingin Ekspor Izin Cuti Dengan Tanggal ' + this.search.startDate + ' Sampai ' + this.search.endDate + ' ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then(resp => {
                    if (resp.isConfirmed) {
                        window.location.href = `${window.location.origin}/exports/izin/3?start_date=${this.search.startDate}&end_date=${this.search.endDate}&status=${this.search.status}`
                    }
                })
            }
        },
        loadPermits() {
            this.$Progress.start();
            axios
                .get(env.VITE_API_URL + "izin/get/3", { params: this.search })
                .then((response) => {
                    if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                        this.$Progress.finish();
                        this.permits = response.data.data;
                        this.table.destroy();
                        this.$nextTick(() => {
                            this.table = $("#datatable1").DataTable({ autoWidth: false });
                        });
                    }
                })
                .catch((e) => {
                    this.$Progress.fail();
                    Api.messageError(e);
                });
        },
        confirmDelete(id) {
            return Api.confirmDelete(
                "Apakah anda yakin?",
                "Data izin akan dihapus!"
            ).then((result) => {
                if (result.isConfirmed) {
                    this.deletePermit(id);
                }
            });
        },
        deletePermit(id) {
            axios
                .delete(env.VITE_API_URL + "izin/3/" + id)
                .then((response) => {
                    this.loadPermits();
                    let status = response.data.status;
                    let message = response.data.message;
                    let status_message =
                        status == Api.STATUS_SUCCESS ? Api.MES_SUCESS : Api.MES_ERROR;
                    Toast.fire({
                        icon: status_message,
                        title: message,
                    });
                })
                .catch((e) => {
                    Api.messageError(e);
                });
        },
        convertDate(date, format = "DD-MM-YYYY", empty = "-") {
            return Api.convertDate(date, format, empty);
        },
    },
};
</script>