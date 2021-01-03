<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <MedicineComponent :medicine="medicine" :name="name"/>
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
      return this.$store.state.user.people[this.$store.state.user.personPointer].medications[this.$store.state.user.medicinePointer]
    },
    name () {
      return this.$store.state.user.people[this.$store.state.user.personPointer].name
    }
  },
  components: {
    MedicineComponent
  }
}
</script>
