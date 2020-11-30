<template>
  <div id="Header-Layout">
    <q-header elevated class="bg-primary">

      <q-btn
        v-if="personPointer === null && medicinePointer === null"
        label="Hitta eller lägg till en person"
        @click="showNewDialog({ searchDialog: true, addPersonDialog: false, addMedicineDialog: false }, '')"
      />

      <q-btn
        v-else
        label="Hitta eller lägg till en medicin"
        @click="showNewDialog({ searchDialog: true, addPersonDialog: false, addMedicineDialog: false }, '')"
      />

      <q-breadcrumbs-el
        v-if="personPointer === null && medicinePointer === null"
        label="Personer"
        icon="people"
      />

      <q-breadcrumbs-el
        v-else
        :label="people[personPointer].name"
        icon="person"
      />

      <q-btn
        label="Alla"
        :color="buttons.all"
        @click="changeAllSearch()"
      />

      <q-btn label="Glömt tagit" :color="buttons.forgot" @click="changeSearchForgotten()">
        <q-badge text-color="white" color="red" v-if="forgotAmount">
          {{ forgotAmount }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
        </q-badge>
      </q-btn>

      <q-btn label="Snart slut på medicin" :color="buttons.runningOut" @click="changeSearchRunningOut()">
        <q-badge text-color="black" color="yellow-6" v-if="runningOutAmount">
          {{ runningOutAmount }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
        </q-badge>
      </q-btn>

      <q-btn
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
      />

    </q-header>
  </div>
</template>

<script>

export default {
  name: 'Header-Layout',
  props: ['people', 'personPointer', 'medicinePointer', 'filterForgotten', 'filterRunningOut', 'forgotAmount', 'runningOutAmount'],
  data () {
    return {
      buttons: {
        all: 'blue-6',
        forgot: 'primary',
        runningOut: 'primary'
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
        this.buttons[key] = 'primary'
      } else {
        this.buttons[key] = 'blue-6'
      }
      if (!this.filterForgotten && !this.filterRunningOut) {
        this.buttons.all = 'blue-6'
      } else {
        this.buttons.all = 'primary'
      }
    },
    showNewDialog (dialogBooleans, key) {
      this.$emit('showNewDialog', { dialogBooleans: dialogBooleans, key: key })
    }
  }
}
</script>
