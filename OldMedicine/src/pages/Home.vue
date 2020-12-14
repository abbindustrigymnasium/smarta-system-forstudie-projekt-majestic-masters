<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <People
        :people="people"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
    </q-page-container>
  </q-layout>
</template>

<script>

import People from '../components/Home/People.vue'

export default {
  name: 'Home',
  mounted () {
    this.$store.commit('user/changePersonPointer', null)
    this.$store.commit('user/changeMedicinePointer', null)
  },
  computed: {
    people () {
      return this.$store.state.user.people
    },
    filterForgotten () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut () {
      return this.$store.state.user.filterRunningOut
    }
  },
  components: {
    People
  }
}
</script>
