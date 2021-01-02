<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <PersonComponent
        :people="people"
        :person="person"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
    </q-page-container>
  </q-layout>
</template>

<script>

import PersonComponent from '../components/Person/PersonComponent.vue'

export default {
  name: 'Person',
  mounted () {
    this.$store.commit('user/changeMedicinePointer', null)
    if (this.$store.state.user.personPointer === null) {
      this.$router.push('/')
    }
  },
  computed: {
    people () {
      return this.$store.state.user.people
    },
    person () {
      return this.$store.state.user.people[this.$store.state.user.personPointer]
    },
    filterForgotten () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut () {
      return this.$store.state.user.filterRunningOut
    }
  },
  components: {
    PersonComponent
  }
}
</script>
