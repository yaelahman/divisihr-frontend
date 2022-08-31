<template>
  <main>
    ANDA BERHASIL LOGIN {{ auth.name }}
  </main>
</template>
<script>
export default {
  data() {
    return {
      auth: {
        name: '-'
      }
    }
  },
  created() {
    // // console.log("WOI")
    if (localStorage.getItem('name') != null) {

      this.auth.name = localStorage.getItem('name')
    }
  }
}
</script>
