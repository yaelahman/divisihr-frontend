<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Perusahaan</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link :to="{
                    name: 'editCompanyUser',
                    params: { id: user_company.id_m_user_company },
                  }" class="btn btn-primary mt-3">
                    <i class="material-icons">edit</i>Update
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="example-content">
                    <label class="form-label">Nama Perusahaan</label>
                    <input type="text" class="form-control" v-model="user_company.m_user_company_name" readonly />
                  </div>
                  <div class="example-content">
                    <label class="form-label">Bidang Usaha</label>
                    <select class="form-select" v-model="user_company.id_m_company_industri" disabled>
                      <option value="" disabled>
                        -- Pilih Bidang Usaha --
                      </option>
                      <option v-for="val in company_industris" :key="val.id" v-bind:value="val.id_m_company_industri"
                        disabled>
                        {{ val.m_company_industriFields }}
                      </option>
                    </select>
                  </div>
                  <div class="example-content">
                    <label class="form-label">Nomor Telepon</label>
                    <input type="number" min="0" class="form-control" v-model="user_company.m_user_company_phone"
                      readonly />
                  </div>
                  <div class="example-content">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="user_company.m_user_company_email" readonly />
                  </div>
                  <div class="example-content">
                    <label class="form-label">Total Anggota</label>
                    <input type="number" min="1" class="form-control"
                      v-model="user_company.m_user_company_total_personel" readonly />
                  </div>
                  <div class="example-content">
                    <label class="form-label">Time Zone</label>
                    <select class="form-select" v-model="user_company.m_user_company_timeZone" disabled>
                      <option value="" disabled>-- Pilih Time Zone --</option>
                      <option value="WIB">WIB</option>
                      <option value="WIT">WIT</option>
                      <option value="WITA">WITA</option>
                    </select>
                  </div>
                  <div class="example-content">
                    <label class="form-label">Tanggal Bergabung</label>
                    <input type="date" class="form-control" v-model="user_company.m_user_company_joinDate" readonly />
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
      company_industris: [],
    };
  },
  created() {
    this.loadCompany();
    this.loadCompanyIndustri();
  },
  mounted() { },
  methods: {
    loadCompany() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start();
        axios
          .get(env.VITE_API_URL + "detail-user-company/" + this.id)
          .then((response) => {
            if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
              this.$Progress.finish();
              this.user_company = response.data.data;
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
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.company_industris = response.data.data;
          }
        })
        .catch((e) => {
          Api.messageError(e);
        });
    },
  },
};
</script>