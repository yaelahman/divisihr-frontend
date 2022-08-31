<template lang="">
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Data Karyawan</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <router-link to="/create-data-personel" class="btn btn-primary">
                    <i class="material-icons">add</i>Tambah
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="datatable1" class="display nowrap w-100">
                      <thead class="text-center text-nowrap">
                        <tr>
                          <th>No</th>
                          <th style="text-align: start;">Nama</th>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>DeviceID</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(personel, index) in personels" :key="index">
                          <td class="text-center">{{index + 1}}</td>
                          <td style="width: 10px; text-align: start;">{{ personel.m_personel_names }}</td>
                          <td>{{ personel.m_personel_personID }}</td>
                          <td>{{ personel.username }}</td>
                          <td>{{ personel.m_personel_email }}</td>
                          <td>{{ personel.device_id }}</td>
                          <td class="text-center">
                            <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Generate Password" @click="confirmGenerate(
                                personel.id_m_personel,
                                personel.m_personel_names,
                                personel.m_personel_personID,
                                personel.m_personel_password_show
                              )">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.0273 13.4258L9.69141 14.6914C9.55078 14.9023 9.3125 15 9.0625 15H7.5V16.5625C7.5 17.082 7.08203 17.5 6.5625 17.5H5V19.0625C5 19.582 4.58203 20 4.0625 20H0.9375C0.419922 20 0 19.582 0 19.0625V15.9375C0 15.6875 0.0987891 15.4492 0.27457 15.2734L6.57422 8.97266C6.36328 8.3125 6.25 7.60547 6.25 6.875C6.25 3.07812 9.32812 0 13.125 0C16.9219 0 20 3.07812 20 6.875C20 10.6719 16.9219 13.75 13.125 13.75C12.3945 13.75 11.6875 13.6367 11.0273 13.4258ZM14.6875 6.875C15.5508 6.875 16.25 6.17578 16.25 5.3125C16.25 4.44922 15.5508 3.75 14.6875 3.75C13.8242 3.75 13.125 4.44922 13.125 5.3125C13.125 6.17578 13.8242 6.875 14.6875 6.875Z" fill="#4D546B"/>
                              </svg>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Reset Device" @click="confirmResetDeviceID (
                                personel.id_m_personel,
                                personel.m_personel_personID,
                                personel.m_personel_names,
                                personel.device_id
                              )">
                                <svg width="14" height="auto" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.20005 0.400391C2.56353 0.400391 1.95308 0.653247 1.50299 1.10333C1.05291 1.55342 0.800049 2.16387 0.800049 2.80039V17.2004C0.800049 17.8369 1.05291 18.4474 1.50299 18.8974C1.95308 19.3475 2.56353 19.6004 3.20005 19.6004H12.8C13.4366 19.6004 14.047 19.3475 14.4971 18.8974C14.9472 18.4474 15.2 17.8369 15.2 17.2004V2.80039C15.2 2.16387 14.9472 1.55342 14.4971 1.10333C14.047 0.653247 13.4366 0.400391 12.8 0.400391H3.20005ZM8.00005 17.2004C8.31831 17.2004 8.62353 17.074 8.84858 16.8489C9.07362 16.6239 9.20005 16.3187 9.20005 16.0004C9.20005 15.6821 9.07362 15.3769 8.84858 15.1519C8.62353 14.9268 8.31831 14.8004 8.00005 14.8004C7.68179 14.8004 7.37656 14.9268 7.15152 15.1519C6.92648 15.3769 6.80005 15.6821 6.80005 16.0004C6.80005 16.3187 6.92648 16.6239 7.15152 16.8489C7.37656 17.074 7.68179 17.2004 8.00005 17.2004V17.2004Z" fill="#4D546B"/>
                                </svg>
                              </button>
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="View">
                                <router-link :to="{ name: 'showDataPersonel', params: { id: personel.id_m_personel }}">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z" fill="#4d546b"/>
</svg>
                                </router-link>
                              </button>
                              <button class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Edit">
                                <router-link :to="{ name: 'editDataPersonel', params: { id: personel.id_m_personel }}">
                                  <i class="material-icons" style="color: #4d546b;">edit</i>
                                </router-link>
                              </button>
                              <button type="button" class="btn btn-sm btn-light" data-toggle="tooltip" data-placement="right" title="Hapus" @click="confirmDelete(
                                personel.id_m_personel,
                                personel.m_personel_names,
                                personel.m_personel_personID
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
      personels: {},
      table: null
    };
  },
  mounted() {
    // // console.log($)
    this.table = $("#datatable1").DataTable({ autoWidth: false });
    this.loadPersonel();
  },
  methods: {
    loadPersonel() {
      this.$Progress.start()
      axios.get(env.VITE_API_URL + "index-data-personel").then((response) => {
        if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
          this.$Progress.finish()
          this.personels = response.data.data;
          this.table.destroy();
          this.$nextTick(() => {
            this.table = $("#datatable1").DataTable({ autoWidth: false });
          });
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