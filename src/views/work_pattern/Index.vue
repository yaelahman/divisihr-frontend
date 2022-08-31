<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Daftar Jadwal</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link to="/create-work-pattern" class="btn btn-primary">
                    <i class="material-icons">add</i>Tambah
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="datatable1" class="display" style="width: 100%">
                      <thead class="text-center">
                        <tr>
                          <th>No</th>
                          <th>Nama Daftar Jadwal</th>
                          <th>Jumlah Hari</th>
                          <th>Jumlah Bekerja</th>
                          <th>Jumlah Libur</th>
                          <th>Toleransi Terlambat</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody style="text-align: center;">
                        <tr v-for="(work_pattern, index) in work_patterns" :key="index">
                          <td class="text-center">
                            {{ ++index }}
                          </td>
                          <td>{{ work_pattern.m_work_patern_name }}</td>
                          <td>
                            {{ work_pattern.m_work_patern_numberCycle }} Hari
                          </td>
                          <td>{{ work_pattern.w_p_d_kerja_count }} Hari</td>
                          <td>{{ work_pattern.w_p_d_libur_count }} Hari</td>
                          <td>
                            {{ work_pattern.m_work_patern_tolerance }} Menit
                          </td>
                          <td class="text-center">
                            <div class="btn-group">
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right"
                                title="Detail">
                                <router-link :to="{
                                  name: 'detailWorkPattern',
                                  params: {
                                    id: work_pattern.id_m_work_patern,
                                  },
                                }" class="btn-light">
                                  <i class="material-icons">visibility</i>
                                </router-link>
                              </button>
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right"
                                title="Edit">
                                <router-link :to="{
                                  name: 'editWorkPattern',
                                  params: {
                                    id: work_pattern.id_m_work_patern,
                                  },
                                }" class="btn-light">
                                  <i class="material-icons">edit</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip"
                                data-placement="right" title="Hapus" @click="
                                  confirmDelete(
                                    work_pattern.id_m_work_patern,
                                    work_pattern.m_work_patern_name
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
  </div>
</template>
<script>
import * as Api from "../../helper/Api.js";
export default {
  data() {
    return {
      work_patterns: {},
      table: null,
    };
  },
  created() {
    this.loadWorkPattern();
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
  },
  methods: {
    loadWorkPattern() {
      this.$Progress.start();
      axios
        .get(env.VITE_API_URL + "index-work-pattern")
        .then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.$Progress.finish();
            this.work_patterns = response.data.data;
            this.table.destroy();
            this.$nextTick(() => {
              this.table = $("#datatable1").DataTable();
            });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          Api.messageError(e);
        });
    },
    confirmDelete(id, name) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Daftar Jadwal dengan nama " + name + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteWorkPattern(id);
        }
      });
    },
    deleteWorkPattern(id) {
      axios
        .delete(env.VITE_API_URL + "delete-work-pattern/" + id)
        .then((response) => {
          this.loadWorkPattern();
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
  },
};
</script>