<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <People
        :people="people"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
      <div class="justify-center fixed-center text-center" style="width: 80%" v-if="people.length === 0">
        <q-item-label class="justify-center text-center row text-h5 text-weight-regular">Ser tomt ut</q-item-label>
        <q-item-label class="justify-center text-center row text-body1">Testa lägga till en någon genom att trycka på '+' knappen</q-item-label>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

import People from '../components/Home/People.vue'

export default {
  name: 'Home',
  mounted () {
    // if (this.$store.state.user.clientId === '') {
    //   this.$router.push('/Login')
    // }
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
