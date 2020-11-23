<template>
  <div id="Person-Component">

    <p class="text-subtitle1">Mediciner - {{ list.length }}</p>

    <q-list content-class="bg-grey-3">
      <template v-for="(medicine, index) in list">
        <q-separator :key="`q-sep-${index}`"></q-separator>
        <q-item :key="index" clickable v-ripple @click="goToMedicine(medicine.index)">

          <q-item-section>
            {{ medicine.name }}
          </q-item-section>

          <q-item-section avatar v-if="medicine.hasForgot">
            <q-icon name="warning" class="text-red"></q-icon>
          </q-item-section>

          <q-item-section avatar v-if="medicine.isRunningOut">
            <q-icon name="warning" class="text-yellow-6"></q-icon>
          </q-item-section>

        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>

export default {
  name: 'Person-Component',
  props: ['person', 'filterForgotten', 'filterRunningOut'],
  computed: {
    list: function () {
      return this.person.medications.filter(medications => ((!this.filterRunningOut && !this.filterForgotten) || (medications.hasForgot && this.filterForgotten) || (medications.isRunningOut && this.filterRunningOut)))
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
