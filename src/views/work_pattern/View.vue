<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>{{ title }} Daftar Jadwal</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form @submit.prevent="createWorkPattern()">
                    <div class="form-group">
                      <label class="form-label">Nama Daftar Jadwal</label>
                      <input v-model="work_pattern.m_work_patern_name" type="text" class="form-control"
                        placeholder="Nama Daftar Jadwal" disabled
                        oninvalid="this.setCustomValidity('Nama Daftar Jadwal harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Jumlah Hari</label>
                      <input type="number" class="form-control" v-model.number="m_work_patern_numberCycle" min="0"
                        max="31" v-on:keyup="addArray()" placeholder="Jumlah Hari" disabled
                        oninvalid="this.setCustomValidity('Jumlah Hari harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Toleransi</label>
                      <div class="row">
                        <div class="col-sm-11">
                          <input v-model="work_pattern.m_work_patern_tolerance" type="number" min="0"
                            class="form-control" placeholder="Toleransi" disabled
                            oninvalid="this.setCustomValidity('Toleransi harus diisi')" oninput="setCustomValidity('')">
                        </div>
                        <div class="col-sm-1">
                          <p class="mt-2">Menit</p>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label" v-if="m_work_patern_numberCycle != ''">Daftar
                        Jadwal</label>
                      <div v-for="(val, index) in work_schedule" :key="index">
                        <div class="row mt-2 mb-2">
                          <div class="col-md-2">
                            <p class="mt-2 bold">Day {{ ++index }}</p>
                          </div>
                          <div class="col-md-3">
                            <select v-model="val.m_work_schedule_type" class="form-select"
                              aria-label="Default select example" disabled>
                              <option value="" disabled>-- Pilih --</option>
                              <option value="1">Kerja</option>
                              <option value="2">Libur</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <input v-model="val.m_work_schedule_clockIn" type="time" class="form-control" disabled
                              id="exampleInputEmail1" aria-describedby="emailHelp">
                          </div>
                          <div class="col-md-1">
                            <p class="mt-2 text-center">s/d</p>
                          </div>
                          <div class="col-md-3">
                            <input v-model="val.m_work_schedule_clockOut" type="time" class="form-control" disabled
                              id="exampleInputEmail1" aria-describedby="emailHelp">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="example-content">
                      <div class="mt-3">
                        <router-link to="/index-work-pattern" class="btn btn-light">
                          <i class="material-icons">arrow_back</i> Kembali
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
      id: '',
      title: 'Detail',
      m_work_patern_numberCycle: '',
      work_schedule: [],
      work_pattern: {}
    };
  },
  created() {
    this.loadWorkPattern();
  },
  methods: {
    loadWorkPattern() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start()
        axios.get(env.VITE_API_URL + "detail-work-pattern/" + this.id).then(response => {
          this.$Progress.finish()
          this.work_pattern = response.data.data;
          this.m_work_patern_numberCycle = response.data.data.m_work_patern_numberCycle;
          this.work_schedule = response.data.data.get_work_schedule;
        })
          .catch(e => {
            this.$Progress.fail()
            Api.messageError(e);
          });
      }
    }
  }
};
</script>
