<template>
  <div id="Header-Layout">
    <q-header elevated class="bg-primary">

      <ButtonsHome
        v-if="personPointer === null && medicinePointer === null"
        @changeSearchDialog="changeSearchDialog()"
        @changeAllSearch="changeAllSearch()"
        @changeSearchForgotten="changeSearchForgotten()"
        @changeSearchRunningOut="changeSearchRunningOut()"
        @changeAddDialog="changeAddDialog()"
        :buttons="buttons"
        :people="people"
      />

      <ButtonsPerson
        v-else-if="personPointer !== null"
        @changeSearchDialog="changeSearchDialog()"
        @changeAllSearch="changeAllSearch()"
        @changeSearchForgotten="changeSearchForgotten()"
        @changeSearchRunningOut="changeSearchRunningOut()"
        @changeAddDialog="changeAddDialog()"
        :person="people[personPointer]"
        :buttons="buttons"
      />

    </q-header>
  </div>
</template>

<script>

import ButtonsHome from './Header/ButtonsHome.vue'
import ButtonsPerson from './Header/ButtonsPerson.vue'

export default {
  name: 'Header-Layout',
  props: ['people', 'personPointer', 'medicinePointer'],
  data () {
    return {
      buttons: {
        all: 'blue-6',
        forgot: 'primary',
        runningOut: 'primary'
      },
      list: this.people
    }
  },
  computed: {
    filterForgotten: function () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut: function () {
      return this.$store.state.user.filterRunningOut
    }
  },
  watch: {
    filterForgotten: function (oldValue, newValue) {
      if (newValue) {
        this.buttons.forgot = 'priamry'
      } else {
        this.buttons.forgot = 'blue-6'
      }
      this.changeButtonAllState()
    },
    filterRunningOut: function (oldValue, newValue) {
      if (newValue) {
        this.buttons.runningOut = 'primary'
      } else {
        this.buttons.runningOut = 'blue-6'
      }
      this.changeButtonAllState()
    }
  },
  methods: {
    changeSearchDialog () {
      this.$emit('changeSearchDialog')
    },
    changeSearchForgotten () {
      this.$store.commit('user/updateFilterForgotten', !this.$store.state.user.filterForgotten)
    },
    changeSearchRunningOut () {
      this.$store.commit('user/updateFilterRunningOut', !this.$store.state.user.filterRunningOut)
    },
    changeAllSearch () {
      this.$store.commit('user/updateFilterForgotten', false)
      this.$store.commit('user/updateFilterRunningOut', false)
    },
    changeButtonAllState () {
      if (!this.filterForgotten && !this.filterRunningOut) {
        this.buttons.all = 'blue-6'
      } else {
        this.buttons.all = 'primary'
      }
    },
    changeAddDialog () {
      this.$emit('changeAddDialog')
    }
  },
  components: {
    ButtonsHome,
    ButtonsPerson
  }
}
</script>
