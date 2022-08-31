<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>{{ title }} Company</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <form class="mt-3" @submit.prevent="createUserCompany()">
                      <div class="example-content">
                        <label class="form-label">Nama Perusahaan</label>
                        <input type="text" class="form-control" v-model="user_company.m_user_company_name" required
                          placeholder="Nama Perusahaan"
                          oninvalid="this.setCustomValidity('Nama Perusahaan harus diisi')"
                          oninput="setCustomValidity('')" />
                      </div>
                      <div class="example-content">
                        <label class="form-label">Bidang Usaha</label>
                        <select class="form-select" v-model="user_company.id_m_company_industri" required
                          placeholder="Bidang Usaha" oninvalid="this.setCustomValidity('Bidang Usaha harus diisi')"
                          oninput="setCustomValidity('')">
                          <option value="" disabled>
                            -- Pilih Bidang Usaha --
                          </option>
                          <option v-for="val in company_industris" :key="val.id"
                            v-bind:value="val.id_m_company_industri">
                            {{ val.m_company_industriFields }}
                          </option>
                        </select>
                      </div>
                      <div class="example-content">
                        <label class="form-label">Nomor Telepon</label>
                        <input type="number" min="0" class="form-control" v-model="user_company.m_user_company_phone"
                          placeholder="Nomor Telp" required oninvalid="this.setCustomValidity('Nomor Telp harus diisi')"
                          oninput="setCustomValidity('')" />
                      </div>
                      <div class="example-content">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="user_company.m_user_company_email"
                          placeholder="Email" required oninvalid="this.setCustomValidity('Email harus diisi')"
                          oninput="setCustomValidity('')" />
                      </div>
                      <div class="example-content">
                        <label class="form-label">Total Anggota</label>
                        <input type="number" min="1" class="form-control"
                          v-model="user_company.m_user_company_total_personel" placeholder="Total Anggota" required
                          oninvalid="this.setCustomValidity('Total Anggota harus diisi')"
                          oninput="setCustomValidity('')" />
                      </div>
                      <div class="example-content">
                        <label class="form-label">Time Zone</label>
                        <select class="form-select" v-model="user_company.m_user_company_timeZone" required
                          oninvalid="this.setCustomValidity('Time Zone harus diisi')" oninput="setCustomValidity('')">
                          <option value="" disabled>
                            -- Pilih Time Zone --
                          </option>
                          <option value="WIB">WIB</option>
                          <option value="WIT">WIT</option>
                          <option value="WITA">WITA</option>
                        </select>
                      </div>
                      <div class="example-content">
                        <label class="form-label">Tanggal Bergabung</label>
                        <input type="date" class="form-control" v-model="user_company.m_user_company_joinDate"
                          placeholder="Tanggal Bergabung" required
                          oninvalid="this.setCustomValidity('Tanggal Bergabung harus diisi')"
                          oninput="setCustomValidity('')" />
                      </div>
                      <div class="example-content">
                        <label class="form-label">Status</label>
                        <select class="form-select" v-model="selectedStatus" required placeholder="Status"
                          oninvalid="this.setCustomValidity('Status harus diisi')" oninput="setCustomValidity('')">
                          <option value="" disabled>
                            -- Pilih Status --
                          </option>
                          <option v-for="(val, index) in status" v-bind:value="index">
                            {{ val }}
                          </option>
                        </select>
                      </div>
                      <div class="example-content mt-3">
                        <button type="submit" class="btn btn-primary" id="submit">
                          <i class="material-icons">save</i>Simpan
                        </button>
                        <router-link to="/index-user-company" type="button" class="btn btn-light">
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
  </div>
</template>
<script>
import * as Api from "../../helper/Api.js";
export default {
  data() {
    return {
      id: "",
      user_company: {
        id_m_company_industri: "",
        m_user_company_timeZone: "",
      },
      status: Api.STATUS_USER_COMPANY,
      selectedStatus: "",
      company_industris: [],
      isReadonly: false,
      title: "Tambah",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.id = this.id != null ? this.id : "";
    if (this.id != "" && this.id != null) {
      $("#submit").html("Update");
    }

    this.isReadonly = this.$route.params.isReadonly;
    // this.loadUserCompany();
  },
  created() {
    this.loadUserCompany();
    this.loadCompanyIndustri();
  },
  methods: {
    createUserCompany() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");


      this.user_company.status = this.selectedStatus;

      axios
        .post(env.VITE_API_URL + "ceate-edit-user-company", {
          id: this.id,
          user_company: this.user_company
        })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/index-user-company");
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((e) => {
          Api.messageError(e);
          $("#submit").prop("disabled", false);
        });
    },

    loadUserCompany() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.title = "Update";
        this.$Progress.start();
        axios
          .get(env.VITE_API_URL + "detail-user-company/" + this.id)
          .then((response) => {
            if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
              this.$Progress.finish();
              this.user_company = response.data.data;
              // console.log(this.user_company)
              this.selectedStatus = this.user_company.user.status
              this.user_company.m_user_company_joinDate = Api.convertDate(
                this.user_company.m_user_company_joinDate,
                "YYYY-MM-DD"
              );
            }
          })
          .catch((e) => {
            this.$Progress.fail();
            Api.messageError(e);
          });
      }
    },

    loadCompanyIndustri() {
      axios
        .get(env.VITE_API_URL + "index-company-industri")
        .then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS)
            this.company_industris = response.data.data;
        })
        .catch((e) => {
          Api.messageError(e);
        });
    },
  },
};
</script>