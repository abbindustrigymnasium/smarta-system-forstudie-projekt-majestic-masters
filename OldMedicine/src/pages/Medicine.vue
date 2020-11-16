<template>
  <q-page class="flex flex-center">
    <h1>page for {{ medicine }}</h1>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      person: null,
      medicine: null
    }
  },
  mounted () {
    this.person = this.$store.state.user.person
    this.medicine = this.$store.state.user.medicine

    if (this.medicine === null) {
      if (this.person === null) {
        this.$router.push('/People')
      }
      this.$router.push('/People/Person')
    }

    this.$store.commit('user/updateUrl', 3)
  }
}
</script>
