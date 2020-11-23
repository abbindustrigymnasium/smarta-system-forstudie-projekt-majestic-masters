<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <h1>lamaomedicinelamao</h1>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Medicine',
  mounted () {
    if (this.$store.state.user.personPointer === null) {
      this.$router.push('/')
    } else if (this.$store.state.user.medicinePointer === null) {
      this.$router.push('/Person')
    }
  }
}
</script>
