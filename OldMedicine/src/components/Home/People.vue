<template>
  <div id="People-Home">
    <div class="row">
      <q-item-section class="col-8 q-gutter-sm q-pt-sm q-pl-sm">
        <q-item-label>Personer - {{ people.length }}</q-item-label>
        <q-item-label caption>Filtrerad - {{ list.length }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-4 q-pt-xs q-pr-xs">
        <div>
          <q-btn class="float-right" size="md" flat color="primary1" style="white-space: nowrap" @click="loggout()">Logga ut</q-btn>
        </div>
      </q-item-section>
    </div>

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
    loggout () {
      this.$store.commit('user/updateIdToken', '')
      this.$store.commit('user/changeClientId', '')
      this.$store.commit('user/resetPeople')
      localStorage.clear()
      this.$router.push('/Person')
    },
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
