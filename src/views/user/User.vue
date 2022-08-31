<template>
  <!--Main layout-->
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Master User</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link to="/create-company-industri" class="btn btn-primary">
                    <i class="material-icons">add</i>Tambah
                  </router-link>
                </div>
                <div class="card-body">
                  <table id="datatable1" class="display" style="width: 100%">
                    <thead class="text-center">
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(val, index) in users.user" :key="index">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>{{ val.name }}</td>
                        <td>{{ val.email }}</td>
                        <td>{{ val.roles[0].name }}</td>
                        <td class="text-center">
                          <div class="btn-group" role="group" aria-label="Basic example">
                            <router-link :to="{
                              name: 'editUser',
                              params: {
                                id: val.id,
                              },
                            }" class="btn btn-sm btn-light">
                              <i class="material-icons">edit</i>
                            </router-link>
                            <button type="button" class="btn btn-sm btn-light" @click="confirmDelete(val.id, val.name)">
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
  <!--Main layout-->
</template>
<script>
import * as Api from "../../helper/Api.js";
export default {
  data() {
    return {
      users: {},
      search: {
        nik: "",
        username: "",
      },
    };
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
    this.loadUser();
  },
  watch: {
    search: {
      handler(val) {
        this.loadUser();
      },
      deep: true,
    },
  },
  methods: {
    loadUser(page = 1) {
      // this.$Progress.start();
      this.search["page"] = page;
      axios
        .get(env.VITE_API_URL + "user", { params: this.search })
        .then((response) => {
          // this.$Progress.finish();
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.users = response.data.data;
            this.table.destroy();
            this.$nextTick(() => {
              this.table = $("#datatable1").DataTable();
            });
          }
        })
        .catch((e) => {
          // this.$Progress.fail();
          Api.messageError(e);
        });
    },

    confirmDelete(id, nama) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "User " + nama + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(id);
        }
      });
    },

    deleteUser(id) {
      axios
        .get(env.VITE_API_URL + "user-delete/" + id)
        .then((response) => {
          this.loadUser();
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
          APi.messageError(e);
        });
    },
  },
};
</script>
