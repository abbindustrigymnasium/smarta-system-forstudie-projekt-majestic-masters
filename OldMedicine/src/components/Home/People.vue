<template>
  <div id="People-Home">
    <q-item-section class="q-gutter-sm q-pt-sm q-pl-sm">
      <q-item-label>Personer - {{ people.length }}</q-item-label>
      <q-item-label caption>Filtrerad - {{ list.length }}</q-item-label>
    </q-item-section>

    <List :list="list" showDelete="person"/>
  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'People-Home',
  props: ['people', 'filterForgotten', 'filterRunningOut'],
  data () {
    return {
      date: (new Date()).getTime()
    }
  },
  computed: {
    list: function () {
      const list = []
      this.people.filter(person => (
        (!this.filterRunningOut && !this.filterForgotten) ||
        (this.lookForForgot(person.medications) && this.filterForgotten) ||
        (this.lookForRunningOut(person.medications) && this.filterRunningOut)
      )).forEach(person => {
        list.push(person)
      })
      return list
    }
  },
  methods: {
    goToPerson (personPointer) {
      this.$store.commit('user/changePersonPointer', personPointer)
      this.$router.push('/Person')
    },
    lookForForgot (meds) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].hasForgot) {
          return true
        }
      }
      return false
    },
    lookForRunningOut (meds) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].remind >= meds[i].amount * meds[i].interval) {
          return true
        }
      }
      return false
    }
  },
  components: {
    List
  }
}
</script>
