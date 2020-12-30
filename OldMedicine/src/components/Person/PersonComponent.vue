<template>
  <div id="Person-Component">
    <p class="text-subtitle1">Mediciner - {{ person.medications.length }}</p>
    <p class="text-subtitle3">Filtrerad - ({{ list.length }})</p>

    <List :list="list" showDelete="medicine"/>

  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'Person-Component',
  props: ['person', 'filterForgotten', 'filterRunningOut'],
  computed: {
    list: function () {
      const list = []
      this.person.medications.filter(medications => (
        (!this.filterRunningOut && !this.filterForgotten) ||
        (medications.hasForgot && this.filterForgotten) ||
        (medications.remind >= medications.amount * medications.interval && this.filterRunningOut)
      )).forEach(medication => {
        list.push(medication)
      })
      return list
    }
  },
  methods: {
    goToMedicine (index) {
      this.$store.commit('user/changeMedicinePointer', index)
      this.$router.push('/Person/Medicine')
    }
  },
  components: {
    List
  }
}
</script>
