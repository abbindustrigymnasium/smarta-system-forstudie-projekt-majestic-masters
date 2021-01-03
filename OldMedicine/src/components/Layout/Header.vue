<template>
  <div id="Header-Layout" class="row justify-center">
    <q-item-section avatar v-if="$q.platform.is.desktop">
      <q-icon v-if="personPointer === null && medicinePointer === null" name="people" class="white" size="lg"/>
      <q-icon v-else name="person" class="white" size="lg"/>
    </q-item-section>

    <q-item-section v-if="$q.platform.is.desktop">
      <q-item-label v-if="personPointer === null && medicinePointer === null">Personer</q-item-label>
      <q-item-label v-else>{{ people[personPointer].name }}</q-item-label>
    </q-item-section>

    <q-btn flat label="Alla" color="white" @click="changeAllSearch()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.all}"/>
    <q-btn flat label="Glömt tagit" color="white" @click="changeSearchForgotten()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.forgot}">
      <q-badge class="q-ml-xs" text-color="white" color="red" v-if="forgotAmount">
        {{ forgotAmount }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

    <q-btn flat label="Snart slut på medicin" color="white" @click="changeSearchRunningOut()" style="border-radius: 0" v-bind:style="{'border-bottom': buttons.runningOut}">
      <q-badge class="q-ml-xs" text-color="black" color="yellow-6" v-if="runningOutAmount">
        {{ runningOutAmount }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

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
