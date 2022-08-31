<template>
    <!--Main layout-->
    <main id="dashboard" class="pt-5 mx-lg-1">
        <div class="container-fluid mt-5">
            <!-- Heading -->
            <div class="card mb-2">
                <!--Card content-->
                <div class="card-body">
                    <div class="mb-2 mb-lg-0">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="mb-2 fw-bold">
                                    <i class="fas fa-users-cog"></i>
                                    Data Role
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Heading -->
            <div class="card mb-4 wow fadeIn">
                <!--Card content-->
                <div class="card-body">
                    <div class="container-fluid mt-3">
                        <b-button v-b-modal.modal-role class="btn-sm mb-3" variant="success" @click="resetModal()">
                            <i class="fas fa-plus"></i>
                            Tambah Role
                        </b-button>
                        <div class="table-responsive">
                            <table class="table table-sm table-striped table-bordered" width="100%">
                                <thead class="text-center text-nowrap">
                                    <tr>
                                        <th rowspan="2" style="vertical-align: middle;">No. </th>
                                        <th style="vertical-align: middle;">Nama Role</th>
                                        <th style="vertical-align: middle;">Dibuat Pada</th>
                                        <th style="vertical-align: middle;">Diperbarui Pada</th>
                                        <th rowspan="2" style="vertical-align: middle;">Aksi</th>
                                    </tr>
                                    <tr>
                                        <th><input type="text" class="form-control form-control-sm"
                                                placeholder="Nama Bidang" v-model="search.name" @change="loadRole"></th>
                                        <th><input type="text" class="form-control form-control-sm"
                                                placeholder="Dibuat Pada" v-model="search.created_at"
                                                @change="loadRole"></th>
                                        <th><input type="text" class="form-control form-control-sm"
                                                placeholder="Diperbarui Pada" v-model="search.updated_at"
                                                @change="loadRole"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(val, index) in roles.data" :key="index">
                                        <td class="text-center">{{ roles.from + index }}</td>
                                        <td>{{ val.name }}</td>
                                        <td>{{ convertDate(val.created_at) }}</td>
                                        <td>{{ convertDate(val.updated_at) }}</td>
                                        <td class="text-center">
                                            <b-button v-b-modal.modal-role variant="warning" size="sm"
                                                @click="edit(val)"
                                                style="margin: 0px 10px; white-space: nowrap; padding: 5px 10px">
                                                <i class="fas fa-pen mr-2"></i>
                                                EDIT
                                            </b-button>
                                            <router-link :to="{ name: 'rolePermission', params: { id: val.id } }"
                                                class="btn btn-info btn-sm"
                                                style="margin: 0px 10px; white-space: nowrap; padding: 5px 10px">
                                                <i class="fas fa-info mr-2"></i>
                                                LIHAT
                                            </router-link>
                                            <button class="btn btn-danger btn-sm"
                                                style="margin: 0px 10px; white-space: nowrap; padding: 5px 10px"
                                                @click="confirmDelete(val.id, val.name)">
                                                <i class="fas fa-trash mr-2"></i>
                                                HAPUS
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pagination :data="roles" @pagination-change-page="loadRole"></pagination>
                    </div>
                </div>
            </div>
            <!-- Heading -->
        </div>
        <role-modal :role="role" :resetModal="resetModal" :handleOk="handleOk" :roleState="roleState"
            :createRole="createRole"></role-modal>
    </main>
    <!--Main layout-->
</template>

<script>
import * as Api from '../../helper/Api.js'
import RoleModal from "../modal/RoleModal.vue";
export default {
    data() {
        return {
            roles: {},
            role: { name: '' },
            search: {
                name: '',
                created_at: '',
                updated_at: ''
            },
            roleState: null,
        }
    },
    created() {
        this.loadRole()
    },
    components: {
        RoleModal
    },
    methods: {
        loadRole(page = 1) {
            Api.start(this.$Progress);
            this.search['page'] = page
            this.$Progress.start()
            axios.get(env.VITE_API_URL + 'role', { params: this.search }).then(response => {
                this.$Progress.finish()
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    this.roles = response.data.data
                }
            })
                .catch(e => {
                    this.$Progress.fail()
                    Api.messageError(e)
                })
        },
        edit(value) {
            this.role = Api.copy(value)
        },
        confirmDelete(id, nama) {
            return Api.confirmDelete('Apakah anda yakin?', "Role " + nama + " akan dihapus!")
                .then((result) => {
                    if (result.isConfirmed) {
                        this.delete(id)
                    }
                })
        },
        delete(id) {
            axios.get(env.VITE_API_URL + 'delete-role/' + id).then(response => {
                if (Api.response(response.data) === Api.STATUS_SUCCESS) {
                    this.loadRole()
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },
        resetModal() {
            this.roleState = null,
                this.role = { name: '' }
        },
        createRole() {
            if (!this.checkFormValidity()) {
                return
            }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-role')
            })
            axios.post(env.VITE_API_URL + 'create-role', this.role).then(response => {
                if (Api.response(response.data) === Api.STATUS_SUCCESS) {
                    this.loadRole()
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
            this.resetModal()
        },
        checkFormValidity() {
            let form = $('#form-role');
            const valid = form[0].checkValidity()
            this.roleState = valid
            return valid
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.createRole()
        }
    }
}
</script>
