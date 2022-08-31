<template>
    <!--Main layout-->
    <main id="dashboard" class="pt-5 mx-lg-1">
        <div class="container-fluid mt-5">
            <!-- Heading -->
            <div class="card mb-4 wow fadeIn">
                <!--Card content-->
                <div class="card-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="mb-2 mb-sm-0 pt-1 greeting">
                                    <h5>Assignment Permission</h5>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <router-link to="/role" class="btn btn-info btn-sm float-right" style="margin: 0px;">
                                    <i class="fas fa-arrow-left"></i> Kembali
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="container-fluid mt-3">
                        <form>
                            <div class="form-group">
                                <label for="email">Role:</label>
                                <input type="text" class="form-control" v-model="role.name" disabled>
                            </div>
                        </form>
                        <b-form-group label="Set Permission">
                            <b-form-checkbox-group v-model="checked" :options="option_permissions" stacked>
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-button variant="primary" @click="setPermission()">Set Permission</b-button>
                    </div>
                </div>
            </div>
            <!-- Heading -->
        </div>
    </main>
    <!--Main layout-->
</template>
<script>
import * as Api from '../../helper/Api.js'
import PermissionModal from "../modal/PermissionModal.vue";
export default {
    data() {
        return {
            permissions: {},
            option_permissions: [],
            permission: {
                name: ''
            },
            checked: [],
            new_permission: [],
            role: { name: '' },
            id: '',
            search: {
                name: '',
                created_at: '',
                updated_at: ''
            },
            permissionState: null,
        }
    },
    created() {
        this.loadRolePermission()
    },
    methods: {
        loadRolePermission(page = 1) {
            this.$Progress.start()
            this.id = this.$route.params.id
            // this.search['page'] = page
            axios.get(env.VITE_API_URL + 'role-permission/' + this.id, { params: this.search }).then(response => {
                this.$Progress.finish()
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    this.permissions = response.data.data.permission
                    this.role = response.data.data.role
                    this.checked = Api.objectToArray(response.data.data.has_permission, 'name')
                    this.permissions.forEach(element => {
                        this.option_permissions.push({
                            text: element.name,
                            value: element.name
                        })
                    });
                }
            })
                .catch(e => {
                    this.$Progress.fail()
                    Api.messageError(e)
                })
        },

        convertDate(date, format = 'DD-MM-YYYY', empty = '-') {
            return Api.convertDate(date, format, empty)
        },

        setPermission() {
            Api.start(this.$Progress)
            axios.post(env.VITE_API_URL + 'set-permission', {
                role: this.role,
                permissions: this.checked
            }).then(response => {
                if (Api.response(response.data) === Api.STATUS_SUCCESS) {
                    let my_roles = this.$store.state.my_roles
                    let is_self = Api.exist(my_roles, this.role.name)
                    if (is_self) {
                        this.getMyPermission()
                    } else {
                        this.$router.push("/role")
                    }
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },

        async getMyPermission() {
            await this.$store.dispatch('getMyPermission')
            this.$router.push("/role")
        }
    }
}
</script>
