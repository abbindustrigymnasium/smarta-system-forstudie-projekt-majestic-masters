<template>
  <div id="Header-Layout" class="column justify-center no-wrap q-pa-none q-ma-none q-gutter-none">
    <div class="row justify-center no-wrap bg-primary2 q-pa-none q-ma-none q-gutter-none" v-if="medicinePointer === null">
      <q-btn class="no-wrap" flat label="Alla" color="white" @click="changeAllSearch()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.all}"/>
      <q-btn class="no-wrap" flat label="Glömt tagit" color="white" @click="changeSearchForgotten()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.forgot}">
        <q-badge class="q-ml-xs no-wrap" text-color="white" color="red" v-if="forgotAmount">
          {{ forgotAmount }} <q-icon name="warning" class="q-ml-xs no-wrap" size="14px"></q-icon>
        </q-badge>
      </q-btn>

      <q-btn class="no-wrap" flat :label="runningOutMessage" color="white" @click="changeSearchRunningOut()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.runningOut}">
        <q-badge class="q-ml-xs no-wrap" text-color="black" color="yellow-6" v-if="runningOutAmount">
          {{ runningOutAmount }} <q-icon name="warning" class="q-ml-xs no-wrap" size="14px"></q-icon>
        </q-badge>
      </q-btn>
    </div>

    <q-item-section v-if="$q.platform.is.mobile" style="min-width: 340px">
      <q-toolbar>
        <q-breadcrumbs gutter="xs" class="no-wrap" active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el label="Personer" icon="people" to="/"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="personPointer !== null && medicinePointer === null" :label="people[personPointer].name" icon="person" to="/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-else-if="personPointer !== null" :label="truncate(people[personPointer].name)" icon="person" to="/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="medicinePointer !== null" :label="truncate(people[personPointer].medications[medicinePointer].name)" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </q-item-section>

  </div>
</template>

<script>

export default {
  name: 'Header-Layout',
  props: ['people', 'personPointer', 'medicinePointer', 'filterForgotten', 'filterRunningOut', 'forgotAmount', 'runningOutAmount'],
  data () {
    return {
      runningOutMessage: 'Snart slut på medicin',
      forgotMessage: 'Glömt tagit',
      buttons: {
        all: '3px solid white',
        forgot: '3px solid transparent',
        runningOut: '3px solid transparent'
      }
    }
  },
  mounted () {
    if (this.$q.platform.is.mobile) {
      this.runningOutMessage = 'Får slut'
      this.forgotMessage = 'Har glömt'
    }
    if (this.filterForgotten) {
      this.buttons.all = '3px solid transparent'
      this.buttons.forgot = '3px solid white'
    }
    if (this.filterRunningOut) {
      this.buttons.all = '3px solid transparent'
      this.buttons.runningOut = '3px solid white'
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
    truncate (string) {
      if (this.$q.platform.is.mobile) {
        return (string.length > 7) ? string.substring(0, 7) + '...' : string
      }
      return (string.length > 14) ? string.substring(0, 14) + '...' : string
    },
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
