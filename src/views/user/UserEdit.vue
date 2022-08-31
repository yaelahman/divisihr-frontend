<template>
  <div>
    <div class="app-content">
      <div class="content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="page-description">
                <h1>Update User</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form class="mt-3" @submit.prevent="updateUser()">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>Nama</label>
                          <input type="text" class="form-control" v-model="user.name" readonly />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>Email</label>
                          <input type="text" class="form-control" v-model="user.email" readonly />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div :class="{ invalid: isInvalid }" v-if="auth.role == 'Super Admin'">
                        <label class="typo__label">Role <span class="required">*</span></label>
                        <multiselect v-model="user.roles" tag-placeholder="Role" placeholder="Cari atau tambah role"
                          label="name" track-by="name" :options="roles" :multiple="true" :taggable="true">
                        </multiselect>
                        <label class="typo__label form__label text-danger" v-show="isInvalid">Role harus diisi</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Password Lama:</label>
                      <input type="password" class="form-control" v-model="user.pwd_lama" placeholder="Password Lama"
                        oninvalid="this.setCustomValidity('Harap isi password lama jika ingin update password')"
                        oninput="setCustomValidity('')" />
                    </div>
                    <div class="form-group">
                      <label for="pwd_baru">Password Baru:</label>
                      <input type="password" class="form-control" id="pwd_baru" v-model="user.pwd_baru"
                        placeholder="Password Baru"
                        oninvalid="this.setCustomValidity('Harap isi password baru jika ingin update password')"
                        oninput="setCustomValidity('')" />
                    </div>
                    <div class="form-group">
                      <label>Confirm Password Baru:</label>
                      <input type="password" class="form-control" v-model="user.pwd_confirm"
                        placeholder="Confirm Password"
                        oninvalid="this.setCustomValidity('Harap isi confirm password jika ingin update password')"
                        oninput="setCustomValidity('')" />
                    </div>
                    <div class="form-group">
                      <label class="text-danger">
                        <em>
                          NB: jika ingin mengganti password silahkan isi
                          password lama, password baru dan confirm passwor
                        </em>
                      </label>
                    </div>
                    <button type="submit" class="btn btn-success float-right mt-3" id="update">
                      Update
                    </button>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      auth: {},
      user: {},
      user: {
        pwd_lama: "",
        pwd_baru: "",
        pwd_confirm: "",
        roles: [],
      },
      isTouched: false,
    };
  },
  created() {
    this.getRoles();
    this.loadUser();
    this.loadProfil();
  },
  computed: {
    isInvalid() {
      return this.isTouched && this.user.user_roles.length === 0;
    },
    ...mapGetters({
      roles: "getRoles",
    }),
  },
  methods: {
    ...mapActions(["getRoles"]),

    updateUser() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";
      $("#update").prop("disabled", true);
      $("#update").html("Loading...");
      axios
        .post(env.VITE_API_URL + "user-update", {
          user: this.user,
          roles: Api.objectToArray(this.user.roles, "name"),
        })
        .then((response) => {
          if (Api.response(response.data) === Api.STATUS_SUCCESS) {
            this.$router.push("/user");
          }
        })
        .catch((e) => {
          Api.messageError(e);
        });
      $("#update").prop("disabled", false);
      $("#update").html("Update");
    },

    loadUser() {
      axios
        .get(env.VITE_API_URL + "user-auth")
        .then((response) => {
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.auth = response.data.data;
          }
        })
        .catch((e) => {
          Api.messageError(e);
        });
    },
    loadProfil() {
      this.id = this.$route.params.id;
      this.id = this.id != null ? this.id : "";

      this.$Progress.start();
      axios
        .get(env.VITE_API_URL + "profil-user-detail/" + this.id)
        .then((response) => {
          this.$Progress.finish();
          if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
            this.user = response.data.data.user;
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          Api.messageError(e);
        });
    },
  },
};
</script>   
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>