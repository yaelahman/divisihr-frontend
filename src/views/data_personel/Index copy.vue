<template lang="">
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Data Personel</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="card">
                <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Tambah Personal</h5>
                  <p class="card-text">Menambahkan dan mengisi data personel</p>
                  <router-link to="/create-data-personel" class="btn btn-primary">Tambahkan</router-link>
                </div>
              </div>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-3" v-for="(personel, index) in personels" :key="index">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ personel.m_personel_names }}</h5>
                  <p class="card-text mt-0 mb-0">Personel ID ( {{ personel.m_personel_personID }} )</p>
                  <p  style="font-weight:bold;">Password : {{ personel.m_personel_password_show }}</p>
                  <p  style="font-weight:bold;">DeviceID : {{ personel.device_id == null ? 'Kosong' : 'Terisi' }}</p>
                  <div class="row text-center">
                    <div class="col-sm-12 mb-2">
                      <button type="button" v-if="personel.m_personel_password_show == null" class="btn btn-primary col-sm-12"
                        @click="confirmGenerate (
                          personel.id_m_personel,
                          personel.m_personel_names,
                          personel.m_personel_personID,
                          personel.m_personel_password_show
                        )"
                      >
                        Generate Password
                      </button>
                      <button type="button" v-else class="btn btn-success col-sm-12"
                        @click="confirmGenerate (
                          personel.id_m_personel,
                          personel.m_personel_names,
                          personel.m_personel_personID,
                          personel.m_personel_password_show
                        )"
                      >
                        Generate Password
                      </button>
                    </div>
                    <div class="col-sm-12 mb-2">
                      <button type="button" class="btn btn-primary col-sm-12"
                        @click="confirmResetDeviceID (
                          personel.id_m_personel,
                          personel.m_personel_personID,
                          personel.m_personel_names,
                          personel.device_id
                        )"
                      >
                        Reset DeviceID
                      </button>
                    </div>
                    <div class="btn-group">
                      <router-link :to="{ name: 'editDataPersonel', params: { id: personel.id_m_personel }}"
                        class="btn btn-warning">
                        Update
                      </router-link>
                      <button type="button" class="btn btn-danger"
                        @click="confirmDelete(
                          personel.id_m_personel,
                          personel.m_personel_names,
                          personel.m_personel_personID
                        )"
                      >
                        Delete
                      </button>
                    </div>
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
      personels: {},
    };
  },
  created() {
    this.loadPersonel();
  },
  methods: {
    loadPersonel() {
      this.$Progress.start()
      axios.get(env.VITE_API_URL + "index-data-personel").then((response) => {
        if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
          this.$Progress.finish()
          this.personels = response.data.data;
        }
      })
        .catch((e) => {
          this.$Progress.fail()
          Api.messageError(e);
        });
    },
    confirmGenerate(id, nama, personID, password) {
      if (password == null) {
        this.generatePassword(id);
      } else {
        return Api.confirmGenerate(
          "Apakah anda yakin?",
          "Data Personel ID " + personID + " dan nama " + nama + " akan digenerate lagi!"
        ).then((result) => {
          if (result.isConfirmed) {
            this.generatePassword(id);
          }
        });
      }
    },
    generatePassword(id) {
      axios.get(env.VITE_API_URL + "generate-password-data-personel/" + id).then((response) => {
        this.loadPersonel();
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
    confirmResetDeviceID(id, personID, nama, deviceID) {
      if (deviceID == null) {
        this.resetDeviceID(id);
      } else {
        return Api.confirmGenerate(
          "Apakah anda yakin?",
          "Data Personel ID " + personID + " dan nama " + nama + " akan direset!",
          'warning',
          'Iya, reset!'
        ).then((result) => {
          if (result.isConfirmed) {
            this.resetDeviceID(id);
          }
        });
      }
    },
    resetDeviceID(id) {
      axios.get(env.VITE_API_URL + "reset-deviceid-data-personel/" + id).then((response) => {
        this.loadPersonel();
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
    confirmDelete(id, nama, personID) {
      // console.log(id, nama, personID);
      return Api.confirmDelete(
        "Apakah anda yakin?",
        "Data Personel ID " + personID + " dan nama " + nama + " akan dihapus!"
      ).then((result) => {
        if (result.isConfirmed) {
          this.deleteDataPersonel(id);
        }
      });
    },
    deleteDataPersonel(id) {
      // console.log(id);
      axios.delete(env.VITE_API_URL + "delete-data-personel/" + id).then((response) => {
        this.loadPersonel();
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