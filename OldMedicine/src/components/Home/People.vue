<template>
  <div id="People-Home">

    <p class="text-subtitle1">Personer - {{ list.length }}</p>

    <q-list content-class="bg-grey-3">
      <template v-for="(person, index) in list">
        <q-separator :key="`q-sep-${index}`"></q-separator>
        <q-item :key="index" clickable v-ripple @click="goToPerson(index)">

          <q-item-section>
            {{ person.name }}
          </q-item-section>

          <q-item-section avatar v-if="person.medications[0].hasForgot">
            <q-icon name="warning" class="text-red"></q-icon>
          </q-item-section>

          <q-badge text-color="black" color="yellow-6" v-if="person.medications[0].isRunningOut">
            {{ person.medications[0].isRunningOut }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>

export default {
  name: 'People-Home',
  props: ['people', 'filterForgotten', 'filterRunningOut'],
  computed: {
    list: function () {
      return this.people.filter(person => ((!this.filterRunningOut && !this.filterForgotten) || (person.medications[0].hasForgot && this.filterForgotten) || (person.medications[0].isRunningOut && this.filterRunningOut)))
    }
  }
}
</script>
