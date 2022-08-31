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
                    <div class="example-content">
                      <label class="form-label">Nama Daftar Jadwal</label>
                      <input v-model="work_pattern.m_work_patern_name" type="text" class="form-control"
                        placeholder="Nama Daftar Jadwal" required
                        oninvalid="this.setCustomValidity('Nama Daftar Jadwal harus diisi')"
                        oninput="setCustomValidity('')">
                    </div>
                    <div class="example-content">
                      <label class="form-label">Jumlah Hari</label>
                      <input type="number" class="form-control" v-model.number="m_work_patern_numberCycle" min="0"
                        max="31" v-on:keyup="addArray()" placeholder="Jumlah Hari" required
                        oninvalid="this.setCustomValidity('Jumlah Hari harus diisi')" oninput="setCustomValidity('')">
                    </div>
                    <div class="example-content">
                      <label class="form-label">Toleransi</label>
                      <div class="row">
                        <div class="col-sm-11">
                          <input v-model="work_pattern.m_work_patern_tolerance" type="number" min="0"
                            class="form-control" placeholder="Toleransi" required
                            oninvalid="this.setCustomValidity('Toleransi harus diisi')" oninput="setCustomValidity('')">
                        </div>
                        <div class="col-sm-1">
                          <p class="mt-2">Menit</p>
                        </div>
                      </div>
                    </div>
                    <div class="example-content">
                      <label class="form-label" v-if="m_work_patern_numberCycle != ''">Daftar Jadwal</label>
                      <div v-for="(val, index) in work_schedule" :key="index">
                        <div class="row mt-2 mb-2">
                          <div class="col-md-2">
                            <p class="mt-2 bold">Day {{ ++index }}</p>
                          </div>
                          <div class="col-md-3">
                            <select v-model="val.m_work_schedule_type" class="form-select"
                              placeholder="Pilih Hari Kerja" required
                              oninvalid="this.setCustomValidity('Pilih Hari Kerja harus diisi')"
                              oninput="setCustomValidity('')">
                              <option value="" disabled>-- Pilih Hari Kerja --</option>
                              <option value="1">Kerja</option>
                              <option value="2">Libur</option>
                            </select>
                          </div>
                          <div class="col-md-7" v-if="val.m_work_schedule_type == '' || val.m_work_schedule_type == 1">
                            <div class=" row">
                              <div class="col-md-5">
                                <input v-model="val.m_work_schedule_clockIn" type="time" class="form-control" required
                                  oninvalid="this.setCustomValidity('Jam Mulai harus diisi')"
                                  oninput="setCustomValidity('')">
                              </div>
                              <div class="col-md-2">
                                <p class="mt-2 text-center">s/d</p>
                              </div>
                              <div class="col-md-5">
                                <input v-model="val.m_work_schedule_clockOut" type="time" class="form-control" required
                                  oninvalid="this.setCustomValidity('Jam Berakhir harus diisi')"
                                  oninput="setCustomValidity('')">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="example-content">
                      <div class="mt-3">
                        <button type="submit" class="btn btn-primary">
                          <i class="material-icons">save</i> Simpan
                        </button>
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
      title: 'Tambah',
      m_work_patern_numberCycle: '',
      work_schedule: [],
      work_pattern: {}
    };
  },
  mounted() {
    this.id = this.$route.params.id
    this.id = this.id != null ? this.id : ''
    if (this.id != '' && this.id != null) {
      $('#submit').html('Update')
    }
  },
  created() {
    this.loadWorkPattern();
  },
  methods: {
    addArray() {
      this.work_schedule = [];
      for (var index = 0; index < this.m_work_patern_numberCycle; index++) {
        this.work_schedule.push({
          m_work_schedule_type: '',
          m_work_schedule_clockIn: '',
          m_work_schedule_clockOut: ''
        });
      }
    },
    createWorkPattern() {
      $('#submit').prop('disabled', true);
      $('#submit').html('Loading...');

      axios.post(env.VITE_API_URL + 'create-edit-work-pattern', {
        id: this.id,
        work_pattern: this.work_pattern,
        m_work_patern_numberCycle: this.m_work_patern_numberCycle,
        work_schedule: this.work_schedule
      }).then(response => {
        if (Api.response(response.data) === Api.STATUS_SUCCESS) {
          this.$router.push("/index-work-pattern")
        }
        $('#submit').prop('disabled', false);
        $('#submit').html('Submit');
      })
        .catch(e => {
          Api.messageError(e)
          $('#submit').prop('disabled', false);
        })
    },
    loadWorkPattern() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start()
        this.title = "Update";
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
