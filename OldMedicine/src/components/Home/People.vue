<template>
  <div id="People-Home">

    <p class="text-subtitle1">Personer - {{ list.length }}</p>

    <List :list="list"/>

    <!-- <q-list content-class="bg-grey-3">
      <template v-for="(person, index) in list">
        <q-separator :key="`q-sep-${index}`"></q-separator>
        <q-item :key="index" clickable v-ripple @click="goToPerson(person.index)">

          <q-icon name="person" class="text-primary"/>

          <q-item-section>
            {{ person.name }}
          </q-item-section>

          <q-badge text-color="white" color="red" v-if="lookFor(person.medications, 'hasForgot')">
            {{ lookForAmount(person.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="lookFor(person.medications, 'isRunningOut')">
            {{ lookForAmount(person.medications, 'isRunningOut') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

        </q-item>
      </template>
    </q-list> -->
  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'People-Home',
  props: ['people', 'filterForgotten', 'filterRunningOut'],
  computed: {
    list: function () {
      const list = []
      this.people.filter(person => (
        (!this.filterRunningOut && !this.filterForgotten) ||
        (this.lookFor(person.medications, 'hasForgot') && this.filterForgotten) ||
        (this.lookFor(person.medications, 'isRunningOut') && this.filterRunningOut)
      )).forEach(person => {
        list.push({ isPerson: true, item: person })
      })
      return list
    }
  },
  methods: {
    goToPerson (personPointer) {
      this.$store.commit('user/changePersonPointer', personPointer)
      this.$router.push('/Person')
    },
    lookForAmount (meds, key) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          amount++
        }
      }
      return amount
    },
    lookFor (meds, key) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
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
