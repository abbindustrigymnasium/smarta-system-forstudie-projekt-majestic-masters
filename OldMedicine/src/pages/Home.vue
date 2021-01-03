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
    console.log(this.$store.state.user)
    const idToken = this.$store.state.user.idToken
    console.log('IDTOKEN', idToken)
    if (idToken.length === 0) {
      this.$router.push('/Login')
    } else {
      const auth = this.$store.state.user.idToken
      console.log('AUUUUUUUUUUUUUUUUUUUUUUTH', auth)
      console.log(this.$store.state.user)
      this.$store.commit('user/getInit', auth)
    }
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
