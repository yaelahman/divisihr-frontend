<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>View Karyawan</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form class="mt-3" @submit.prevent="createDataPersonel()">
                    <div class="form-group">
                      <label class="form-label">Nama Personel</label>
                      <input type="text" class="form-control" v-model="data_personel.m_personel_names"
                        placeholder="Nama Personel" required disabled
                        oninvalid="this.setCustomValidity('Nama Personel harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Personel ID</label>
                      <input type="number" pattern="[a-zA-Z0-9 ]+" class="form-control"
                        v-model="data_personel.m_personel_personID" placeholder="Personel ID" required disabled
                        oninvalid="this.setCustomValidity('Personel ID harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Username</label>
                      <input type="text" class="form-control" v-model="data_personel.username" placeholder="Username"
                        required disabled oninvalid="this.setCustomValidity('Username harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Jenis Kelamin</label>
                      <select class="form-select" v-model="data_personel.m_personel_gender" required disabled
                        oninvalid="this.setCustomValidity('Jenis Kelamin harus diisi')" oninput="setCustomValidity('')">
                        <option value="" disabled> -- Pilih Jenis Kelamin -- </option>
                        <option value="1">Laki-laki</option>
                        <option value="2">Perempuan</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" v-model="data_personel.m_personel_email"
                        placeholder="Email" required disabled oninvalid="this.setCustomValidity('Email harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Departemen</label>
                      <select class="form-select" v-model="data_personel.id_m_departemen" required disabled
                        placeholder="Departemen" oninvalid="this.setCustomValidity('Departemen harus diisi')"
                        oninput="setCustomValidity('')">
                        <option value="" disabled>
                          -- Pilih Departemen --
                        </option>
                        <option v-for="val in departemens" :key="val.id" v-bind:value="val.id_m_departemen">
                          {{ val.m_departemen_name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Jumlah Cuti</label>
                      <input type="number" min="0" class="form-control" v-model="data_personel.total_leave"
                        placeholder="Jumlah Cuti" required disabled
                        oninvalid="this.setCustomValidity('Jumlah Cuti harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Tanggal Kadaluarsa Cuti</label>
                      <input type="date" class="form-control" v-model="data_personel.effective_date_leave"
                        placeholder="Tanggal Kadaluarsa Cuti" required disabled
                        oninvalid="this.setCustomValidity('Tanggal Kadaluarsa Cuti harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>

                    <div class="form-group">
                      <label class="form-label">Device ID</label>
                      <input type="email" class="form-control" v-model="data_personel.device_id" placeholder="Device ID"
                        required disabled oninvalid="this.setCustomValidity('Email harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Password</label>
                      <input type="email" class="form-control" v-model="data_personel.m_personel_password_show"
                        placeholder="Password" required disabled oninvalid="this.setCustomValidity('Email harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <div class="mt-3">
                        <router-link to="/index-data-personel" class="btn btn-light">
                          <i class="material-icons">arrow_back</i>Kembali
                        </router-link>
                      </div>
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
      data_personel: {
        m_personel_gender: "",
        id_m_departemen: ""
      },
      departemens: [],
      attendance_spot: {},
      title: "Tambah",
      id: "",
    };
  },
  created() {
    this.loadDepartemen();
    this.loadDataPersonel();
  },
  methods: {
    loadDepartemen() {
      axios.get(env.VITE_API_URL + "index-departemen").then((response) => {
        if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
          this.$Progress.finish()
          this.departemens = response.data.data;
        }
      })
        .catch((e) => {
          this.$Progress.fail()
          Api.messageError(e);
        });
    },
    createDataPersonel() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");

      axios.post(env.VITE_API_URL + "create-edit-data-personel", {
        id: this.id,
        data_personel: this.data_personel,
      })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/index-data-personel");
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((e) => {
          Api.messageError(e);
          $("#submit").prop("disabled", false);
        });
    },
    loadDataPersonel() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start()
        this.title = "Update";
        axios.get(env.VITE_API_URL + "show-data-personel/" + this.id).then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.$Progress.finish()
            this.data_personel = response.data.data;
            if (this.data_personel.id_m_departemen == null) {
              this.data_personel.id_m_departemen = ""
            }
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