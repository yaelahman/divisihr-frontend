<template>
  <b-modal
    id="modal-role"
    ref="modal"
    title="Role"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="createRole" id="form-role">
      <b-form-group
        :state="roleState"
        label="Nama Role"
        label-for="role-input"
        invalid-feedback="Nama harus diisi"
      >
        <b-form-input
          id="role-input"
          v-model="role.name"
          :state="roleState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <template v-slot:modal-footer="{ ok, cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button variant="danger" @click="cancel()"> Cancel </b-button>
      <b-button variant="primary" @click="ok()">
        <span v-if="role.id != null">Update</span>
        <span v-else>Tambah</span>
      </b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    role: Object,
    resetModal: Function,
    createRole: Function,
    handleOk: Function,
    roleState: Boolean,
  },
};
</script>
