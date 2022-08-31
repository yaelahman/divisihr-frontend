<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>{{ title }} Company Industri</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form class="mt-3" @submit.prevent="createCompanyIndustri()">
                    <div class="example-content">
                      <label class="form-label">Kode</label>
                      <input type="text" class="form-control" v-model="company_industri.m_company_industriCode"
                        pattern="[a-zA-Z0-9 ]+" placeholder="Kode" required
                        oninvalid="this.setCustomValidity('Kode harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="example-content">
                      <label class="form-label">Kategori</label>
                      <input type="text" class="form-control" v-model="company_industri.m_company_industriFields"
                        placeholder="Kategori" required oninvalid="this.setCustomValidity('Kategori harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="example-content mt-3">
                      <button type="submit" class="btn btn-primary" id="submit">
                        <i class="material-icons">save</i>Simpan
                      </button>
                      <router-link to="/index-company-industri" type="button" class="btn btn-light">
                        <i class="material-icons">arrow_back</i>Kembali
                      </router-link>
                    </div>
                  </form>
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
      id: "",
      company_industri: {},
      title: "Tambah",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.id = this.id != null ? this.id : "";
    if (this.id != "" && this.id != null) {
      $("#submit").html("Update");
    }
  },
  created() {
    this.loadCompanyIndustri();
  },
  methods: {
    createCompanyIndustri() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");

      axios.post(env.VITE_API_URL + "ceate-edit-company-industri", {
        id: this.id,
        company_industri: this.company_industri,
      })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/index-company-industri");
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((e) => {
          Api.messageError(e);
          $("#submit").prop("disabled", false);
        });
    },

    loadCompanyIndustri() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start()
        this.title = "Update";
        axios.get(env.VITE_API_URL + "detail-company-industri/" + this.id).then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.$Progress.finish()
            this.company_industri = response.data.data;
          }
        })
          .catch((e) => {
            this.$Progress.fail()
            Api.messageError(e);
          });
      }
    },
  },
};
</script>