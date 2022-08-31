<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Lokasi Kehadiran</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link to="/attendance-spot/create" class="btn btn-primary">
                    <i class="material-icons">add</i>Tambah
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="datatable1" class="display" style="width: 100%">
                      <thead class="text-center">
                        <tr>
                          <th>No</th>
                          <th class="text-nowrap">Nama Lokasi</th>
                          <th class="text-nowrap">Total Anggota</th>
                          <th>Alamat</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="text-align: center;" v-for="(val, index) in attendance_spot" :key="index">
                          <td class="text-center">{{ ++index }}</td>
                          <td>{{ val.m_attendance_spots_name }}</td>
                          <td class="text-center">{{ val.count_personel }}</td>
                          <td>{{ val.m_attendance_spots_address }}</td>
                          <td class="text-center">
                            <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Penempatan Personel">
                                <router-link
                                  :to="{ name: 'addPersonelAttendanceSpot', params: { id: val.id_m_attendance_spots } }"
                                  class="btn-light">
                                  <i class="material-icons">group_add</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Detail">
                                <router-link
                                  :to="{ name: 'detailPersonelAttendanceSpot', params: { id: val.id_m_attendance_spots } }"
                                  class="btn-light">
                                  <i class="material-icons">visibility</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Edit">
                                <router-link
                                  :to="{ name: 'editAttendanceSpot', params: { id: val.id_m_attendance_spots } }"
                                  class="btn-light">
                                  <i class="material-icons">edit</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Hapus"
                                @click="confirmDelete(val.id_m_attendance_spots, val.m_attendance_spots_name)">
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
      attendance_spot: {},
      table: null,
    };
  },
  created() {
    this.getAttendanceSpot();
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
  },
  methods: {
    getAttendanceSpot() {
      this.$Progress.start()
      axios.get(env.VITE_API_URL + "attendance-spot").then((response) => {
        this.$Progress.finish()
        this.attendance_spot = response.data.data;
        this.table.destroy();
        this.$nextTick(() => {
          this.table = $("#datatable1").DataTable();
        });
      })
        .catch((error) => {
          this.$Progress.fail()
        });
    },
    confirmDelete(id, nama) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Attendance Spot " + nama + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteAttendanceSpot(id);
        }
      });
    },
    deleteAttendanceSpot(id) {
      axios.delete(env.VITE_API_URL + "attendance-spot/" + id).then((response) => {
        this.getAttendanceSpot();
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
};
</script>