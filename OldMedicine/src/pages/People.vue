<template>
  <q-page class="flex flex-center">
    <h1 @click="TestPerson">Simon</h1>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    TestPerson: function () {
      this.$store.commit('user/updatePerson', 'Simon')
      this.$router.push('/People/Person')
    }
  },
  mounted () {
    this.$store.commit('user/updateUrl', 1)
  }
}
</script>
