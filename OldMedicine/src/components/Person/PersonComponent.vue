<template>
  <div id="Person-Component">
    <q-item-section class="q-gutter-sm q-pt-sm q-pl-sm">
      <q-item-label>Mediciner - {{ person.medications.length }}</q-item-label>
      <q-item-label caption>Filtrerad - {{ list.length }}</q-item-label>
    </q-item-section>

    <List :list="list" showDelete="medicine" :people="people"/>

  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'Person-Component',
  props: ['people', 'person', 'filterForgotten', 'filterRunningOut'],
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
