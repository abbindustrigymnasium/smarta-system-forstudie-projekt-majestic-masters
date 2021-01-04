<template>
  <div id="Tabs-Layout" class="bg-primary1 text-white">
    <q-item-section>
      <q-toolbar>
        <q-breadcrumbs gutter="xs" class="no-wrap" active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el label="Personer" icon="people" to="/"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="personPointer !== null" :label="people[personPointer].name" icon="person" to="/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="medicinePointer !== null" :label="people[personPointer].medications[medicinePointer].name" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </q-item-section>
  </div>
</template>

<script>

export default {
  name: 'Tabs-Layout',
  props: ['people', 'personPointer', 'medicinePointer', 'filterForgotten', 'filterRunningOut', 'forgotAmount', 'runningOutAmount'],
  data () {
    return {
      buttons: {
        all: '3px solid white',
        forgot: '3px solid transparent',
        runningOut: '3px solid transparent'
      }
    }
  },
  watch: {
    filterForgotten: function (oldValue, newValue) {
      this.changeButtonState(newValue, 'forgot')
    },
    filterRunningOut: function (oldValue, newValue) {
      this.changeButtonState(newValue, 'runningOut')
    }
  },
  methods: {
    changeSearchDialog () {
      this.$emit('changeSearchDialog')
    },
    changeSearchForgotten () {
      this.$store.commit('user/updateFilterForgotten', !this.filterForgotten)
    },
    changeSearchRunningOut () {
      this.$store.commit('user/updateFilterRunningOut', !this.filterRunningOut)
    },
    changeAllSearch () {
      this.$store.commit('user/updateFilterForgotten', false)
      this.$store.commit('user/updateFilterRunningOut', false)
    },
    changeButtonState (newValue, key) {
      if (newValue) {
        this.buttons[key] = '3px solid transparent'
      } else {
        this.buttons[key] = '3px solid white'
      }
      if (!this.filterForgotten && !this.filterRunningOut) {
        this.buttons.all = '3px solid white'
      } else {
        this.buttons.all = '3px solid transparent'
      }
    },
    showNewDialog (dialogBooleans, key) {
      this.$emit('showNewDialog', { dialogBooleans: dialogBooleans, key: key })
    }
  }
}
</script>
