<template>
  <div id="Medicine-Component">

    <p class="text-subtitle1">{{ medicine }}</p>

  </div>
</template>

<script>

export default {
  name: 'Person-Component',
  props: ['medicine', 'filterForgotten', 'filterRunningOut'],
  computed: {
    list: function () {
      return this.medicine.filter(medication => ((!this.filterRunningOut && !this.filterForgotten) || (medication.hasForgot && this.filterForgotten) || (medication.isRunningOut && this.filterRunningOut)))
    }
  },
  methods: {
    goToMedicine (index) {
      this.$store.commit('user/changeMedicinePointer', index)
      this.$router.push('/Person/Medicine')
    }
  }
}
</script>
