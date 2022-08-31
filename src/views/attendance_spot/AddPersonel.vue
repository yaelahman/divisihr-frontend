<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Penempatan Personel</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form @submit.prevent="createAddPersonelAttendanceSpot()">
                    <table id="datatable1" class="display" style="width: 100%">
                      <thead>
                        <tr>
                          <th>
                            <label class="form-checkbox">
                              <input type="checkbox" v-model="selectAll" @click="select" />
                              <i class="form-icon"></i>
                            </label>
                          </th>
                          <th class="text-center">Personel ID</th>
                          <th class="text-center">Nama Personel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(personel, index) in personels" :key="index">
                          <td>
                            <label class="form-checkbox">
                              <input type="checkbox" :value="personel.id_m_personel" v-model="selected" />
                              <i class="form-icon"></i>
                            </label>
                          </td>
                          <td>{{ personel.m_personel_personID }}</td>
                          <td>{{ personel.m_personel_names }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                    <div class="mt-5">
                      <button type="submit" id="submit" class="btn btn-primary">
                        <i class="material-icons">save</i>Simpan
                      </button>
                      <router-link to="/attendance-spot" class="btn btn-light">
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
      table: null,
      personels: [],
      selected: [],
      selectAll: false,
    };
  },
  created() {
    this.loadPersonel();
  },
  mounted() {
    this.id = this.$route.params.id;
    this.id = this.id != null ? this.id : "";
    this.table = $("#datatable1").DataTable();
  },
  methods: {
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let personel in this.personels) {
          this.selected.push(this.personels[personel].id_m_personel);
        }
      }
    },

    loadPersonel() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start();
        axios
          .get(env.VITE_API_URL + "get-attendance-personel/" + this.id)
          .then((response) => {
            if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
              this.$Progress.finish();
              this.personels = response.data.data;
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
      }
    },

    createAddPersonelAttendanceSpot() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");

      axios
        .post(env.VITE_API_URL + "attendance-personel/add-personel", {
          id: this.id,
          selected: this.selected,
        })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/attendance-spot");
          }
          $("#submit").prop("disabled", false);
          $("#submit").html("Submit");
        })
        .catch((error) => {
          $("#submit").prop("disabled", false);
        });
    },
  },
};
</script>