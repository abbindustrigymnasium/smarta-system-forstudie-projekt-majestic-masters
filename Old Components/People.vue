<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <AllPeopleForPhone v-if="!$q.platform.is.desktop" :people="people"/>
    </q-page-container>
  </q-layout>
</template>

<script>

import AllPeopleForPhone from '../components/AllPeopleForPhone.vue'

export default {
  name: 'PageIndex',
  computed: {
    people () {
      return this.$store.state.user.people
    }
  },
  components: {
    AllPeopleForPhone
  }
}
</script>
