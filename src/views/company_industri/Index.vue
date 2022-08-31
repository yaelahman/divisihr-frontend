<template lang="">
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Company Industry</h1>
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
                  <div class="table-responsive">
                    <table id="datatable1" class="display" style="width:100%">
                      <thead class="text-center">
                        <tr>
                          <th>No</th>
                          <th>Kode</th>
                          <th>Kategori</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(company_industri, index) in company_industris" :key="index">
                          <td class="text-center">{{index + 1}}</td>
                          <td>{{company_industri.m_company_industriCode}}</td>
                          <td>{{company_industri.m_company_industriFields}}</td>
                          <td class="text-center">
                            <div class="btn-group">
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Edit">
                                <router-link :to="{ name: 'editCompanyIndustri', params: { id: company_industri.id_m_company_industri }}">
                                  <i class="material-icons" style="color: #4d546b;">edit</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Hapus" @click="confirmDelete(
                                company_industri.id_m_company_industri,
                                company_industri.m_company_industriCode,
                                company_industri.m_company_industriFields
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
      company_industris: {},
      table: null,
    };
  },
  created() {
    this.loadCompanyIndustri();
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
    this.loadCompanyIndustri();
  },
  methods: {
    loadCompanyIndustri() {
      this.$Progress.start()
      axios.get(env.VITE_API_URL + "index-company-industri").then((response) => {
        if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
          this.$Progress.finish()
          this.company_industris = response.data.data;
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
    },
    confirmDelete(id, code, kategori) {
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Company Industri kode " + code + " dan kategori " + kategori + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteCompanyIndustri(id);
        }
      });
    },
    deleteCompanyIndustri(id) {
      axios.delete(env.VITE_API_URL + "delete-company-industri/" + id).then((response) => {
        this.loadCompanyIndustri();
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