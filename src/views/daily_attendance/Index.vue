<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Kehadiran Harian</h1>
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
                        <input type="date" class="form-control start-date" placeholder="Start Date"
                          v-model="search.startDate" @click="search.endDate = ''" required />
                      </div>
                      <div class="col-sm-1">
                        <label></label>
                        <p class="text-center mt-2">s/d</p>
                      </div>
                      <div class="col-sm-3">
                        <label>End Date</label>
                        <input type="date" class="form-control" placeholder="End Date" :min="search.startDate"
                          v-model="search.endDate" :disabled="search.startDate == ''" required />
                      </div>
                      <div class="col-sm-4" style="margin-top: 1.8rem;">
                        <button class="btn btn-primary" style="width: 120px;"
                          @click="filterType = 'show'">Tampilkan</button>
                        <button class="btn btn-primary" style="width: 120px;" @click="filterType = 'download'">
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
                          <th>Tanggal Masuk</th>
                          <th>Jam Masuk</th>
                          <th>Tanggal Pulang</th>
                          <th>Jam Pulang</th>
                          <th>Menit Terlambat</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="text-align: center" v-for="(val, index) in daily_attendances" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td style="width: 10px; text-align: start;">
                            {{ val.personel.m_personel_names }}
                            <span style="margin-left: 5px;" v-if="val.t_absensi_status == 2" class="
                                badge
                                badge-sm
                                badge-style-bordered
                                badge-warning
                              ">WFH</span>
                          </td>
                          <td v-if="val.t_absensi_startDate != null">
                            {{ convertDate(val.t_absensi_startDate) }}
                          </td>
                          <td v-else class="text-center">-</td>
                          <td class="text-nowrap" v-bind:class="{ 'text-danger': (val.t_absensi_isLate != 1) }"
                            v-if="val.t_absensi_startClock != null">
                            {{ val.t_absensi_startClock }} WIB
                          </td>
                          <td v-else class="text-center">-</td>
                          <td v-if="val.t_absensi_endDate != null">
                            {{ convertDate(val.t_absensi_endDate) }}
                          </td>
                          <td v-else class="text-center">-</td>
                          <td class="text-nowrap" v-if="val.t_absensi_endClock != null">
                            {{ val.t_absensi_endClock }} WIB
                          </td>
                          <td v-else class="text-center">-</td>
                          <td>
                            {{ menitTerlambat(val) }}
                          </td>
                          <td>
                            <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Lokasi awal" data-bs-toggle="modal"
                                data-bs-target="#ModalMaps" @click="Maps(val, 'start')">
                                <i class="material-icons">place</i>
                              </button>
                              <button v-if="val.photo_absensi.length > 0" type="button" class="btn btn-sm btn-light"
                                data-toggle="tooltip" data-placement="right" title="Image" data-bs-toggle="modal"
                                data-bs-target="#ModalImage" @click="Modal(val)">
                                <i class="material-icons">image</i>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Catatan Telat Masuk & Pulang" data-bs-toggle="modal"
                                data-bs-target="#ModalCatatan" @click="Modal(val, 'end')">
                                <i class="material-icons">book</i>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Edit" data-bs-toggle="modal" data-bs-target="#Modal"
                                @click="Modal(val)">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Hapus" @click="
                                  confirmDelete(
                                    val.id_t_absensi,
                                    val.personel.m_personel_names
                                  )
                                ">
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
    <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="updateAbsensi()">
            <div class="modal-header">
              <h5 class="modal-title">Edit</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <input type="hidden" v-model="modal.startDate" />
            <input type="hidden" v-model="modal.endDate" />
            <div class="modal-body">
              <div class="form-group mt-2">
                <label>Nama</label>
                <input type="text" disabled class="form-control" v-model="modal.nama" />
              </div>
              <div class="form-group mt-2">
                <label>Keterangan Datang</label>
                <select v-model="modal.isLate" class="form-control">
                  <option value="" disabled>-- Pilih Status --</option>
                  <option value="1">Tidak Terlambat</option>
                  <option value="2">Terlambat</option>
                </select>
              </div>
              <div class="form-group mt-2">
                <label>Jam Masuk</label>
                <input type="time" class="form-control" v-model="modal.startClock" step="any" />
              </div>
              <div class="form-group mt-2">
                <label>Jam Pulang</label>
                <input type="time" class="form-control" v-model="modal.endClock" step="any"
                  :disabled="modal.endClock === null" />
              </div>
              <div class="form-group mt-2 ml-5">
                <div class="form-check form-switch">
                  <input class="form-check-input ml-3" type="checkbox" v-model="modal.status" />
                  <label class="form-check-label" for="flexSwitchCheckChecked">WFH ?</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" id="submit" class="btn btn-primary">
                Save
              </button>
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ModalMaps" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Lokasi Personel Absensi
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <label class="mb-2">Masuk</label>
                <GmapMap :center="center" :zoom="20" style="width: 100%; height: 400px; border: 1px solid gray">
                  <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
                    @click="center = m.position">
                  </GmapMarker>
                </GmapMap>
              </div>
              <div v-if="this.markers2.length > 0" class="col-sm-6">
                <label class="mb-2">Pulang</label>
                <GmapMap :center="center2" :zoom="20" style="width: 100%; height: 400px; border: 1px solid gray">
                  <GmapMarker :key="index" v-for="(m, index) in markers2" :position="m.position"
                    @click="center2 = m.position">
                  </GmapMarker>
                </GmapMap>
              </div>
              <div v-else class="col-sm-6">
                <label class="mb-2 text-danger">Belum Absen Pulang</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ModalCatatan" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Catatan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <h5>Catatan Terlambat Masuk</h5>
                <textarea class="form-control mb-4" v-model="modal.catatan_masuk" cols="30" rows="10"
                  readonly></textarea>
              </div>
              <div class="col-sm-6">
                <h5>Catatan Terlambat Pulang</h5>
                <textarea class="form-control" v-model="modal.catatan_pulang" cols="30" rows="10" readonly></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ModalImage" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Foto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <label class="mb-2">Masuk</label>
                <img v-bind:src="
                  modal.photo
                " alt="" width="100%" />
              </div>
              <div class="col-sm-6">
                <label class="mb-2">Pulang</label>
                <img v-bind:src="
                  modal.photo2
                " alt="" width="100%" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ModalCatatan" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Catatan Absensi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <textarea class="form-control" v-model="modal.catatan" cols="30" rows="10" readonly></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import * as Api from "../../helper/Api.js";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      daily_attendances: {},
      table: null,
      edit: null,
      search: {
        t_absensi_Dates: "",
        startDate: '',
        endDate: "",
      },
      modal: {
        id: "",
        nama: "",
        isLate: "",
        startDate: "",
        startClock: "",
        endDate: "",
        endClock: "",
        status: false,
        photo: "",
        photo2: "",
        catatan_masuk: "",
        catatan_pulang: "",
      },
      center: {
        lat: -6.93,
        lng: 107.6,
      },
      center2: {
        lat: -6.93,
        lng: 107.6,
      },
      currentPlace: null,
      markers: [],
      markers2: [],
      places: [],
      filterType: null,
    };
  },
  created() {
    this.loadDailyAttendance();
    this.getDateNow();
  },
  mounted() {
    this.geolocate();
    this.table = $("#datatable1").DataTable({ autoWidth: false });
  },
  methods: {
    getDateNow() {
      const today = new Date();
      this.search.t_absensi_Dates = moment(today).format("YYYY-MM-DD");
    },
    menitTerlambat(val) {
      var start = val.t_absensi_startDate + ' ' + val.t_absensi_startClock
      var now = val.t_absensi_Dates + ' ' + val.work_personel.get_work_schedule.m_work_schedule_clockIn
      var tolerance = val.work_personel.get_work_pattern.m_work_patern_tolerance
      var a = moment(moment(start).toArray());
      var b = moment(moment(now).toArray());
      var result = (a.diff(b, 'minutes') - tolerance) < 0 ? 0 : (a.diff(b, 'minutes') - tolerance)
      return result + ' Menit'
    },
    filterRangeDate() {
      if (this.filterType == 'show') {
        var a = moment(moment(this.search.startDate).toArray());
        var b = moment(moment(this.search.endDate).toArray());
        if (b.diff(a, 'days') + 1 < 8) {
          this.loadDailyAttendance()
        } else {
          Swal.fire({
            title: "Perhatian",
            text: 'Selisih tanggal melebihi dari 7 hari harap gunakan unduh',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
        }
      } else {

        Swal.fire({
          title: "Ekspor Absensi",
          text: 'Ingin Ekspor Absensi Dengan Tanggal ' + this.search.startDate + ' Sampai ' + this.search.endDate + ' ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          reverseButtons: true
        }).then(resp => {
          if (resp.isConfirmed) {
            window.location.href = `${window.location.origin}/exports/absensi?start_date=${this.search.startDate}&end_date=${this.search.endDate}`
          }
        })
      }
    },
    loadDailyAttendance() {
      this.$Progress.start();
      axios
        .get(env.VITE_API_URL + "daily-attendance", { params: this.search })
        .then((response) => {
          this.$Progress.finish();
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.daily_attendances = response.data.data;
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
    Modal(val, type = 'start') {
      this.modal = {
        id: val.id_t_absensi,
        nama: val.personel.m_personel_names,
        isLate: val.t_absensi_isLate,
        startClock: val.t_absensi_startClock,
        endClock: val.t_absensi_endClock,
        startDate: val.t_absensi_startDate,
        endDate: val.t_absensi_endDate,
        catatan: val.t_absensi_catatan,
        catatan_masuk: val.t_absensi_catatan_telat_masuk == null ? '-' : val.t_absensi_catatan_telat_masuk,
        catatan_pulang: val.t_absensi_catatan == null ? '-' : val.t_absensi_catatan,
        photo: null,
        photo2: null,
      };
      if (val.t_absensi_status == 2) {
        this.modal.status = true;
      }
      if (val.photo_absensi.length > 0) {
        if (val.photo_absensi.length > 1) {
          this.modal.photo2 = Api.URL_PHOTO + val.photo_absensi[1].t_absensi_photofileOri;
        }
        this.modal.photo = Api.URL_PHOTO + val.photo_absensi[0].t_absensi_photofileOri;

      }
    },
    Maps(val, status) {
      var latLong = val.t_absensi_latLong.split(",");
      this.center = {
        lat: parseFloat(latLong[0]),
        lng: parseFloat(latLong[1]),
      };
      this.addMarker();

      this.markers2 = [];
      if (val.t_absensi_latLongEnd != null) {

        var latLong = val.t_absensi_latLongEnd.split(",");
        this.center2 = {
          lat: parseFloat(latLong[0]),
          lng: parseFloat(latLong[1]),
        };
        this.addMarker2();
      }
    },
    updateAbsensi() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");
      axios
        .post(env.VITE_API_URL + "daily-attendance", {
          id: this.modal.id,
          absensi: this.modal,
        })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            $("#Modal").modal("hide");
            this.loadDailyAttendance();
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((e) => {
          Api.messageError(e);
          $("#submit").prop("disabled", false);
        });
    },
    confirmDelete(id, name) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Absensi " + name + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteDailyAttendance(id);
        }
      });
    },
    deleteDailyAttendance(id) {
      axios
        .delete(env.VITE_API_URL + "daily-attendance/" + id)
        .then((response) => {
          this.loadDailyAttendance();
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
    addMarker() {
      this.markers = [];
      const marker = {
        lat: this.center.lat,
        lng: this.center.lng,
      };
      this.markers.push({ position: marker });
    },
    addMarker2() {
      this.markers2 = [];
      const marker = {
        lat: this.center2.lat,
        lng: this.center2.lng,
      };
      this.markers2.push({ position: marker });
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>