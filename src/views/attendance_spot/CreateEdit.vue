<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Tambah Lokasi Kehadiran</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-xl-6">
                  <div class="card widget widget-list">
                    <div class="card-header">
                      <h5 class="card-title">Peta Lokasi</h5>
                    </div>
                    <div class="card-body">
                      <!-- <Map :left="left" :right="right" /> -->
                      <div classs="mb-1" style="height: 400px; width: 100%">
                        <GmapMap :center="center" :zoom="12" style="width: 100%; height: 400px">
                          <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
                            @click="center = m.position">
                          </GmapMarker>
                          <GmapCircle v-for="(pin, index) in markers" :key="index" :center="pin.position"
                            :radius="radius" :visible="true" :options="{ fillColor: 'blue', fillOpacity: 0.3 }">
                          </GmapCircle>
                        </GmapMap>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="card widget widget-list">
                    <div class="card-body">
                      <form @submit.prevent="saveAttendanceSpot()">
                        <div class="example-content">
                          <label class="form-label">Alamat</label>
                          <div class="row">
                            <div class="col-sm-8">
                              <GmapAutocomplete class="form-control address" placeholder="Alamat" required
                                oninvalid="this.setCustomValidity('Alamat diisi')" oninput="setCustomValidity('')"
                                @place_changed="setPlace">
                              </GmapAutocomplete>
                            </div>
                            <div class="col-sm">
                              <button type="button" class="btn btn-primary mt-1" @click="addMarker">
                                Cari Lokasi
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="example-content">
                          <label class="form-label">Nama Lokasi</label>
                          <input type="text" class="form-control" v-model="attendance_spot.m_attendance_spots_name"
                            placeholder="Nama Lokasi" required oninvalid="this.setCustomValidity('Nama Lokasi diisi')"
                            oninput="setCustomValidity('')" />
                        </div>
                        <div class="example-content">
                          <label class="form-label">Radius</label>
                          <select v-model.number="radius" class="form-control" required
                            oninvalid="this.setCustomValidity('Radius harus diisi')" oninput="setCustomValidity('')"
                            @change="addMarker()">
                            <option value="" disabled>
                              -- Pilih Radius --
                            </option>
                            <option value="10">10 Meter</option>
                            <option value="20">20 Meter</option>
                            <option value="30">30 Meter</option>
                            <option value="40">40 Meter</option>
                            <option value="50">50 Meter</option>
                            <option value="100">100 Meter</option>
                          </select>
                        </div>
                        <div class="example-content mt-3">
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
    </div>
  </div>
</template>
<script>
import * as Api from "../../helper/Api.js";
export default {
  data() {
    return {
      currentPlace: null,
      markers: [],
      places: [],
      radius: "",
      attendance_spot: {
        m_attendance_spots_address: "",
        m_attendance_spots_name: "",
        m_attendance_spots_latitude: 0,
        m_attendance_spots_longitude: 0,
        m_attendance_spots_radius: 0,
      },
      center: {
        lat: -6.93,
        lng: 107.6,
      },
      id: null,
    };
  },
  mounted() {
    this.geolocate();
    this.loadAttendanceSpot();
  },
  methods: {
    saveAttendanceSpot() {
      $("#submit").prop("disabled", true);
      $("#submit").html("Loading...");

      axios
        .post(env.VITE_API_URL + "attendance-spot", {
          id: this.id,
          attendance_spot: this.attendance_spot,
          radius: this.radius,
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
    loadAttendanceSpot() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      if (this.id != "") {
        this.$Progress.start();
        this.title = "Update";
        axios
          .get(env.VITE_API_URL + "attendance-spot/" + this.id)
          .then((response) => {
            if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
              this.$Progress.finish();
              this.attendance_spot = response.data.data;
              $(".address").val(
                this.attendance_spot.m_attendance_spots_address
              );
              this.radius = this.attendance_spot.m_attendance_spots_radius;
              this.center.lat = parseFloat(
                this.attendance_spot.m_attendance_spots_latitude
              );
              this.center.lng = parseFloat(
                this.attendance_spot.m_attendance_spots_longitude
              );
              this.currentPlace =
                this.attendance_spot.m_attendance_spots_address;
              this.addMarker();
            }
          })
          .catch((e) => {
            this.$Progress.fail();
            Api.messageError(e);
          });
      }
    },
    setPlace(place) {
      this.currentPlace = place;
      this.center.lat = this.currentPlace.geometry.location.lat();
      this.center.lng = this.currentPlace.geometry.location.lng();
    },
    addMarker() {
      if (this.currentPlace) {
        this.markers = [];
        this.places = [];
        const marker = {
          lat: this.center.lat,
          lng: this.center.lng,
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        let address = $(".address").val();

        this.attendance_spot.m_attendance_spots_address = address;
        this.attendance_spot.m_attendance_spots_latitude = marker.lat;
        this.attendance_spot.m_attendance_spots_longitude = marker.lng;
        this.attendance_spot.m_attendance_spots_radius = this.radius;

        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>