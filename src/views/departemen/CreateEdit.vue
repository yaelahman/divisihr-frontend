<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>{{ title }} Departemen</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form class="mt-3" @submit.prevent="createDepartemen()">
                    <div class="example-content">
                      <label class="form-label">Nama</label>
                      <input type="text" class="form-control" v-model="departemen.m_departemen_name" placeholder="Nama"
                        required oninvalid="this.setCustomValidity('nama harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="example-content mt-3">
                      <button type="submit" class="btn btn-primary" id="submit">
                        <i class="material-icons">save</i>Simpan
                      </button>
                      <router-link to="/index-departemen" type="button" class="btn btn-light">
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
      departemen: {},
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
    this.loadDepartemen();
  },
  methods: {
    createDepartemen() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");

      axios.post(env.VITE_API_URL + "ceate-edit-departemen", {
        id: this.id,
        departemen: this.departemen,
      })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/index-departemen");
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((e) => {
          Api.messageError(e);
          $("#submit").prop("disabled", false);
        });
    },

    loadDepartemen() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start()
        this.title = "Update";
        axios.get(env.VITE_API_URL + "detail-departemen/" + this.id).then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.$Progress.finish()
            this.departemen = response.data.data;
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