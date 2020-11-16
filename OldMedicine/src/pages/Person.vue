<template>
  <q-page class="flex flex-center">
    <h1 @click="TestMedicine">weed</h1>
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
    this.$store.commit('user/updateUrl', 2)
    this.person = this.$store.state.user.person
    // // Forget medicine? eller ändra en dir som även är 'global'
    // this.medicine = null
    // this.$store.commit('user/updateMedicine', this.medicine)
  },
  methods: {
    TestMedicine: function () {
      this.$store.commit('user/updateMedicine', 'weed')
      this.$router.push('/People/Person/Medicine')
    }
  }
}
</script>
