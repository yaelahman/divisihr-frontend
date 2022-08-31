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
                                    <i class="fas fa-user-tag"></i>
                                    Data Permission
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
                        <b-button v-b-modal.modal-permission class="btn-sm mb-3" variant="success"
                            @click="resetModal()">
                            <i class="fas fa-plus"></i>
                            Tambah Permission
                        </b-button>
                        <div class="table-responsive">
                            <table class="table table-sm table-striped table-bordered" width="100%:">
                                <thead class="text-center text-nowrap">
                                    <tr>
                                        <th rowspan="2" style="vertical-align: middle;">No. </th>
                                        <th style="vertical-align: middle;">Nama Role</th>
                                        <th style="vertical-align: middle;">Dibuat Pada</th>
                                        <th style="vertical-align: middle;">Diperbarui Pada</th>
                                        <th rowspan="2" style="vertical-align: middle;">Aksi</th>
                                    </tr>
                                    <tr>
                                        <th><input type="text" class="form-control form-control-sm place-holder-center"
                                                placeholder="Nama Role" v-model="search.name" @change="loadPermission">
                                        </th>
                                        <th><input type="text" class="form-control form-control-sm place-holder-center"
                                                placeholder="Dibuat Pada" v-model="search.created_at"
                                                @change="loadPermission"></th>
                                        <th><input type="text" class="form-control form-control-sm place-holder-center"
                                                placeholder="Diperbarui Pada" v-model="search.updated_at"
                                                @change="loadPermission"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(val, index) in permissions.data" :key="index">
                                        <td class="text-center">{{ permissions.from + index }}</td>
                                        <td class="">{{ val.name }}</td>
                                        <td class="">{{ convertDate(val.created_at) }}</td>
                                        <td class="">{{ convertDate(val.updated_at) }}</td>
                                        <td class="text-center">
                                            <b-button v-b-modal.modal-permission @click="edit(val)" variant="warning"
                                                size="sm"
                                                style="margin: 0px 10px; white-space: nowrap; padding: 5px 10px">
                                                <i class="fas fa-pen mr-2"></i>
                                                EDIT
                                            </b-button>
                                            <button class="btn btn-danger btn-sm"
                                                style="margin: 0px 10px; white-space: nowrap; padding: 5px 10px"
                                                @click="confirmDelete(val.id, val.name)">
                                                <i class="fas fa-trash mr-2"></i>
                                                DELETE
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pagination :data="permissions" @pagination-change-page="loadPermission"></pagination>
                    </div>
                </div>
            </div>
            <!-- Heading -->
        </div>
        <permission-modal :permission="permission" :resetModal="resetModal" :handleOk="handleOk"
            :permissionState="permissionState" :createPermission="createPermission"></permission-modal>
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
            permission: { name: '' },
            search: {
                name: '',
                created_at: '',
                updated_at: ''
            },
            permissionState: null,
        }
    },
    created() {
        this.loadPermission()
    },
    components: {
        PermissionModal
    },
    methods: {
        loadPermission(page = 1) {
            this.search['page'] = page
            this.$Progress.start()
            axios.get(env.VITE_API_URL + 'permission', { params: this.search }).then(response => {
                this.$Progress.finish()
                if (Api.response(response.data, false) === Api.STATUS_SUCCESS) {
                    this.permissions = response.data.data
                }
            })
                .catch(e => {
                    this.$Progress.fail()
                    Api.messageError(e)
                })
        },

        edit(value) {
            this.permission = Api.copy(value)
        },

        confirmDelete(id, nama) {
            return Api.confirmDelete('Apakah anda yakin?', "Permission " + nama + " akan dihapus!")
                .then((result) => {
                    if (result.isConfirmed) {
                        this.deletePermision(id)
                    }
                })
        },

        deletePermision(id) {
            axios.get(env.VITE_API_URL + 'delete-permission/' + id).then(response => {
                if (Api.response(response.data) === Api.STATUS_SUCCESS) {
                    this.loadPermission()
                }
            })
                .catch(e => {
                    Api.messageError(e)
                })
        },


        resetModal() {
            this.permissionState = null,
                this.permission = { name: '' }
        },

        createPermission() {
            if (!this.checkFormValidity()) {
                return
            }
            this.$nextTick(() => {
                this.$bvModal.hide('modal-permission')
            })
            axios.post(env.VITE_API_URL + 'create-permission', this.permission).then(response => {
                if (Api.response(response.data) === Api.STATUS_SUCCESS)
                    this.loadPermission()
            })
                .catch(e => {
                    Api.messageError(e)
                })
            this.resetModal()
        },

        checkFormValidity() {
            let form = $('#form-permission');
            const valid = form[0].checkValidity()
            this.permissionState = valid
            return valid
        },

        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.createPermission()
        }
    }
}
</script>
