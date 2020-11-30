<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <MedicineComponent :medicine="medicine"/>
    </q-page-container>
  </q-layout>
</template>

<script>

import MedicineComponent from '../components/Medicine/MedicineComponent.vue'

export default {
  name: 'Medicine',
  mounted () {
    if (this.$store.state.user.personPointer === null) {
      this.$router.push('/')
    } else if (this.$store.state.user.medicinePointer === null) {
      this.$router.push('/Person')
    }
  },
  computed: {
    medicine () {
      console.log(this.$store.state.user.personPointer, this.$store.state.user.medicinePointer)
      return this.$store.state.user.people[this.$store.state.user.personPointer].medications[this.$store.state.user.medicinePointer]
    }
  },
  components: {
    MedicineComponent
  }
}
</script>
