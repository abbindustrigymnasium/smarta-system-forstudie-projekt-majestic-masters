<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <PersonComponent
        :people="people"
        :person="person"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
      <div class="justify-center fixed-center text-center" style="width: 80%" v-if="person.medications.length === 0">
        <q-item-label class="justify-center text-center row text-h5 text-weight-regular">Ser tomt ut</q-item-label>
        <q-item-label class="justify-center text-center row text-body1">Testa lägga till en medicin genom att trycka på '+' knappen</q-item-label>
      </div>
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
