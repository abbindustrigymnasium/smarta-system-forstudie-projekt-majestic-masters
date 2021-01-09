<template>
  <div id="Header-Layout" class="column justify-center no-wrap q-pa-none q-ma-none q-gutter-none">
    <!-- <q-item-section avatar v-if="$q.platform.is.desktop" class="q-pl-sm">
      <q-icon v-if="personPointer === null && medicinePointer === null" name="people" class="white" size="lg"/>
      <q-icon v-else name="person" class="white" size="lg"/>
    </q-item-section> -->

    <!-- <q-item-section v-if="$q.platform.is.desktop">
      <q-item-label v-if="personPointer === null && medicinePointer === null">Personer</q-item-label>
      <q-item-label v-else>{{ people[personPointer].name }}</q-item-label>
    </q-item-section> -->

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
          <q-breadcrumbs-el v-if="personPointer !== null" :label="truncate(people[personPointer].name)" icon="person" to="/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="medicinePointer !== null" :label="truncate(people[personPointer].medications[medicinePointer].name)" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </q-item-section>

    <!-- <div class="bg-primary text-white fixed-bottom">
      <q-toolbar>
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Personer" icon="people" to="/"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="personPointer !== null" :label="people[personPointer].namn" icon="person" to="/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="medicinePointer !== null" :label="people[personPointer].mediciner[medicinePointer].namn" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </div> -->

    <!-- <q-btn
      v-if="personPointer === null && medicinePointer === null"
      label="Lägg till någon"
      class="bg-green"
      @click="showNewDialog({ searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, '')"
    />

    <q-btn
      v-else
      label="Lägg till en medicin"
      class="bg-green"
      @click="showNewDialog({ searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, '')"
    /> -->
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
