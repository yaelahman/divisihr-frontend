<template>
    <div>
        <div class="app-content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="page-description">
                                <h1>Detail Izin Hari</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header d-flex justify-content-between">
                                    <div class="form-group">
                                        <div class="mt-3">
                                            <router-link to="/izin-hari" class="btn btn-light">
                                                <i class="material-icons">arrow_back</i>Kembali
                                            </router-link>
                                        </div>
                                    </div>
                                    <div v-html="mapStatus(permit.permit_status)"></div>
                                </div>
                                <div class="card-body py-3">
                                    <div class="form-group">
                                        <label class="form-label">Nama</label>
                                        <input type="text" class="form-control"
                                            v-model="permit.personel.m_personel_names" required disabled>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Departemen</label>
                                        <input type="text" class="form-control"
                                            v-model="permit.personel.departemen.m_departemen_name" required disabled>
                                    </div>
                                    <div class="row row-cols-2">
                                        <div class="col">
                                            <div class="form-group">
                                                <label class="form-label">Tanggal Pengajuan</label>
                                                <input type="text" class="form-control"
                                                    :value="convertDate(permit.created_at)" required disabled>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label class="form-label">Jam Pengajuan</label>
                                                <input type="text" class="form-control"
                                                    :value="convertDate(permit.created_at, 'HH:mm')" required disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Tanggal Izin</label>
                                        <div class="table-responsive" style="border-radius: 8px">
                                            <table class="table table-secondary table-tanggal-izin">
                                                <tbody>
                                                    <tr class="p-0" v-for="(val, index) in permit.permit_date"
                                                        :key="index">
                                                        <td class="py-0"
                                                            style="width: 5%; padding: 5px 10px !important;">{{ index
                                                                    + 1
                                                            }}</td>
                                                        <td style="padding: 5px 10px !important;">{{
                                                                convertDate(val.permit_date)
                                                        }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">Lama Izin</label>
                                        <input type="text" class="form-control" :value="jumlahHari(permit)" required
                                            disabled>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Keperluan</label>
                                        <textarea type="text" class="form-control" v-model="permit.permit_description"
                                            required disabled></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">File Kelengkapan</label>
                                        <div class="table-responsive">
                                            <table class="table-files">
                                                <tr>
                                                    <td v-for="val in permit.permit_image">
                                                        <img data-bs-toggle="modal" data-bs-target="#ModalImage"
                                                            @click="url = 'http://divisihr-backend-dev.mamorasoft.com/storage/photo_permit/' + val.permit_photo"
                                                            :src="'http://divisihr-backend-dev.mamorasoft.com/storage/photo_permit/' + val.permit_photo"
                                                            alt="" class="me-1" width="143px" height="193px">
                                                    </td>
                                                    <td v-if="permit.permit_image.length < 1">
                                                        <h6 class="text-muted">Tidak ada foto terlampir.</h6>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="permit.permit_status != 0">
                                        <label class="form-label">Catatan</label>
                                        <textarea type="text" class="form-control" v-model="data.catatan" required
                                            disabled></textarea>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="btn-group">
                                        <div v-if="permit.permit_status == 0">
                                            <button class="btn btn-warning rounded-pill me-2" data-bs-toggle="modal"
                                                data-bs-target="#ModalCatatan" @click="Modal('tolak')">
                                                <i class="material-icons">close</i> Tolak
                                            </button>
                                            <button class="btn btn-primary rounded-pill me-2" data-bs-toggle="modal"
                                                data-bs-target="#ModalCatatan" @click="Modal('setuju')">
                                                <i class="material-icons">check</i> Setuju
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button class="btn btn-primary rounded-pill me-2" data-bs-toggle="modal"
                                                data-bs-target="#ModalEditPersetujuan" @click="Modal('')">
                                                <i class="material-icons">edit</i> Edit Persetujuan
                                            </button>
                                        </div>
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
                    <div class="modal-header text-center">
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

        <div class="modal fade" id="ModalImage" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title">Foto Izin:</h5>
                    </div>
                    <div class="modal-body">
                        <img :src="url" alt="" width="100%">
                    </div>
                    <div class="modal-footer text-center">
                        <div class="mx-auto">
                            <button type="button" class="btn rounded-pill btn-light me-2 btn-cancel"
                                data-bs-dismiss="modal">
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="ModalEditPersetujuan" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="display: block;">
                        <h5 class="modal-title text-center">Edit Persetujuan:</h5>
                        <p>Silahkan input catatan dari admin pada kolom di bawah ini:</p>
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
                            <button class="btn btn-warning rounded-pill me-2 btn-submit"
                                @click="permitApprove('tolak')">
                                <i class="material-icons">close</i> Tolak
                            </button>
                            <button class="btn btn-primary rounded-pill me-2 btn-submit"
                                @click="permitApprove('setuju')">
                                <i class="material-icons">check</i> Setuju
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as Api from "../../../helper/Api.js";
import moment from "moment";
export default {
    data() {
        return {
            permit: {
                personel: {
                    m_personel_names: "",
                    departemen: {
                        m_departemen_name: ""
                    },
                },
                permit_date: [],
                permit_image: [],
                permit_description: ""
            },
            data: {
                catatan: "",
                type: "",
                id: "",
            },
            attendance_spot: {},
            title: "Tambah",
            id: "",
            url: ""
        };
    },
    created() {
        this.id = this.$route.params.id;
        // // console.log()
        this.id = this.id != null ? this.id : "";
        this.loadPermit();
    },
    methods: {
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
                    return '<button class="mt-3 btn btn-light">Menunggu Persetujuan</button>'
                    break;
                case 1:
                    return '<button class="mt-3 btn btn-success">Diterima</button>'
                    break;
                case 2:
                    return '<button class="mt-3 btn btn-danger">Ditolak</button>'
                    break;
                default:
                    break;
            }
        },
        Modal(type = '') {
            this.data.id = this.id
            this.data.type = type
        },
        loadPermit() {
            axios.get(env.VITE_API_URL + "izin/detail/" + this.id).then((response) => {
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    this.$Progress.finish()
                    this.permit = response.data.data;
                    this.data.catatan = response.data.data.permit_approval != null ? response.data.data.permit_approval.permit_approval_reason : '';
                    // $('.table-tanggal-izin tbody tr td').addClass('py-0')
                    // // console.log($('.table-tanggal-izin tbody tr td'))
                }
            })
                .catch((e) => {
                    this.$Progress.fail()
                    Api.messageError(e);
                });
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
                    this.loadPermit();
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
        convertDate(date, format = "DD-MM-YYYY", empty = "-") {
            return Api.convertDate(date, format, empty);
        },
    },
};
</script>