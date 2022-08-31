<template lang="">
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Departemen</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link to="/create-departemen" class="btn btn-primary">
                    <i class="material-icons">add</i>Tambah
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="dt-1" class="display w-100" style="width:100%">
                      <thead class="text-center">
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(departemen, index) in departemens" :key="index">
                          <td class="text-center">{{index + 1}}</td>
                          <td>{{departemen.m_departemen_name}}</td>
                          <td class="text-center">
                            <div class="btn-group">
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Edit">
                                <router-link :to="{ name: 'editDepartemen', params: { id: departemen.id_m_departemen }}">
                                  <i class="material-icons" style="color: #4d546b;">edit</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Hapus" @click="confirmDelete(
                                departemen.id_m_departemen,
                                departemen.m_departemen_name
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
      departemens: [],
      table: null,
    };
  },
  created() {
    // this.loadDepartemen();
  },
  mounted() {
    this.table = $("#dt-1").DataTable();
    this.loadDepartemen();
  },
  methods: {
    loadDepartemen() {
      this.$Progress.start()
      axios.get(env.VITE_API_URL + "index-departemen").then((response) => {
        if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
          this.$Progress.finish()
          this.departemens = response.data.data;
          $("#dt-1").DataTable();
          this.table.destroy();
          this.$nextTick(() => {
            this.table = $("#dt-1").DataTable();
          });
        }
      })
        .catch((e) => {
          this.$Progress.fail()
          Api.messageError(e);
        });
    },
    confirmDelete(id, dep) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Departemen " + dep + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteDepartemen(id);
        }
      });
    },
    deleteDepartemen(id) {
      axios.delete(env.VITE_API_URL + "delete-departemen/" + id).then((response) => {
        this.loadDepartemen();
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