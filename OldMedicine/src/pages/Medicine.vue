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
    this.$store.commit('user/updateUrl', 3)
    // Get person with store
    this.person = this.$store.state.user.person

    // Get medicine with store
    this.medicine = this.$store.state.user.medicine
  }
}
</script>
