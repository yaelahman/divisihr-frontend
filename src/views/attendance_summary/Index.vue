<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Ringkasan Kehadiran</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-3">
                      <label>Start Date</label>
                      <input type="date" class="form-control start-date" placeholder="Start Date"
                        v-model="search.startDate" @change="loadAttendanceSummary" @click="resetEndDate" />
                    </div>
                    <div class="col-sm-1">
                      <label></label>
                      <p class="text-center mt-2">s/d</p>
                    </div>
                    <div class="col-sm-3">
                      <label>End Date</label>
                      <input type="date" class="form-control" placeholder="End Date" :min="search.startDate"
                        v-model="search.endDate" @change="loadAttendanceSummary" :disabled="search.startDate == ''" />
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <table id="datatable1" class="display" style="width: 100%">
                    <thead class="text-center">
                      <tr>
                        <th>Nama</th>
                        <th>Kehadiran Hari</th>
                        <th>Kehadiran Jam</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(val, index) in attendance_summary" :key="index">
                        <td>{{ val.m_personel_names }}</td>
                        <td>{{ val.kehadiran }} Hari</td>
                        <td>{{ val.total_jam }} Jam</td>
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
</template>
<script>
import * as Api from "../../helper/Api.js";

export default {
  data() {
    return {
      attendance_summary: {},
      search: {
        startDate: "",
        endDate: "",
      },
      table: null,
    };
  },
  created() {
    this.loadAttendanceSummary();
  },
  mounted() {
    this.table = $("#datatable1").DataTable();
  },
  methods: {
    loadAttendanceSummary() {
      this.$Progress.start();
      axios
        .get(env.VITE_API_URL + "attendance-summary", { params: this.search })
        .then((response) => {
          this.$Progress.finish();
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.attendance_summary = response.data.data;
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
    resetEndDate() {
      this.search.endDate = "";
    },
  },
};
</script>