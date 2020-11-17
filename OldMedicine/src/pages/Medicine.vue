<template>
  <q-page class="flex flex-center">
    <h6>{{ personer[personPointer].mediciner[medicinePointer].namn }} {{ personer[personPointer].mediciner[medicinePointer].antal }} {{ personer[personPointer].mediciner[medicinePointer].beskrivning }}</h6>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      personer: null,
      personPointer: null,
      medicinePointer: null
    }
  },
  mounted () {
    this.personer = this.$store.state.user.people
    this.personPointer = this.$store.state.user.personPointer
    this.medicinePointer = this.$store.state.user.medicinePointer

    if (this.medicinePointer === null) {
      if (this.personPointer === null) {
        this.$router.push('/People')
      } else {
        this.$router.push('/People/Person')
      }
    } else {
      this.$store.commit('user/updateUrl', 3)
    }
  }
}
</script>
