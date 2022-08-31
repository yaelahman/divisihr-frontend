<template lang="">
    <div>
        <div class="app-content">
            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="page-description">
                                <h1>Company</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <router-link to="/create-user-company" class="btn btn-primary">
                                        <i class="material-icons">add</i>Tambah
                                    </router-link>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="datatable1" class="display" style="width:100%">
                                            <thead class="text-center">
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama Perusahaan</th>
                                                    <th>Jenis Perusahaan</th>
                                                    <th>Nomor Telp</th>
                                                    <th>Email</th>
                                                    <th>Total Anggota</th>
                                                    <th>Tanggal Bergabung</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(user_company, index) in user_companies" :key="index">
                                                    <td class="text-center">{{ ++index }}</td>
                                                    <td>{{ user_company.m_user_company_name }}</td>
                                                    <td v-if="user_company.company_industri != null">
                                                        {{ user_company.company_industri.m_company_industriFields }}
                                                    </td>
                                                    <td v-else>
                                                        -
                                                    </td>
                                                    <td>{{ user_company.m_user_company_phone }}</td>
                                                    <td>{{ user_company.m_user_company_email }}</td>
                                                    <td>{{ user_company.m_user_company_total_personel }}</td>
                                                    <td>{{ convertDate(user_company.m_user_company_joinDate) }}</td>
                                                    <td>{{ status[user_company.status] }}</td>
                                                    <td class="text-center">
                                                        <div class="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Edit">                                                        
                                                            <router-link :to="{ name: 'editUserCompany', params: {
                                                                    id: user_company.id_m_user_company, isReadonly: true
                                                                }}"
                                                            >
                                                                <i class="material-icons" style="color: #4d546b;">edit</i>
                                                            </router-link>
                                                            </button>
                                                            <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Hapus"
                                                                @click="confirmDelete(
                                                                    user_company.id_m_user_company,
                                                                    user_company.m_user_company_name
                                                                )"
                                                            >
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
      user_companies: {},
      table: null,
      status: ["Tidak Aktif", "Gratis Awal", "Gratis", "Berbayar"],
    };
  },
  created() {
    this.loadUserCompany();
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
    this.loadUserCompany();
  },
  methods: {
    loadUserCompany() {
      this.$Progress.start();
      axios
        .get(env.VITE_API_URL + "index-user-company")
        .then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.$Progress.finish();
            this.user_companies = response.data.data;
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
        "User Company dengan nama " + name + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteCompany(id);
        }
      });
    },
    deleteCompany(id) {
      axios
        .delete(env.VITE_API_URL + "delete-user-company/" + id)
        .then((response) => {
          this.loadUserCompany();
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