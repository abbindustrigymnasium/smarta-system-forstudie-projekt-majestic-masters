<template><!-- showdialog resets key changeKey changes key to given value -->
  <q-layout view="hHh Lpr lff">
    <Header
      v-if="medicinePointer === null"
      @showNewDialog="showNewDialog($event)"
      :people="people"
      :personPointer="personPointer"
      :medicinePointer="medicinePointer"
      :filterForgotten="filterForgotten"
      :filterRunningOut="filterRunningOut"
      :forgotAmount="forgotAmount"
      :runningOutAmount="runningOutAmount"
    />

    <q-drawer v-if="personPointer !== null" id="DrawerPerson" show-if-above :width="200" :breakpoint="200" bordered content-class="bg-grey-3">
      <Drawer
        :list="people"
        :personPointer="personPointer"
      />
    </q-drawer>

    <q-drawer v-if="medicinePointer !== null" id="DrawerMedicine" show-if-above :width="200" :breakpoint="200" bordered content-class="bg-grey-3">
      <Drawer
        :list="people[personPointer]"
        :medicinePointer="medicinePointer"
      />
    </q-drawer>

    <!-- <q-dialog v-if="dialogBooleans.searchDialog || dialogBooleans.addPersonDialog || dialogBooleans.addMedicineDialog"> WHY IS THIS NOT REACTIVE-->
    <q-dialog v-model="dialogBooleans.searchDialog">
      <Dialog
        v-model="dialogBooleans.searchDialog"
        @showNewDialog="showNewDialog($event)"
        :list="currentList"
        :personPointer="personPointer"
      />
    </q-dialog>

    <q-dialog v-model="dialogBooleans.addPersonDialog">
      <Dialog
        v-model="dialogBooleans.addPersonDialog"
        @showNewDialog="showNewDialog($event)"
        :list="people"
        :keyInit="keyInit"
        person=True
      />
    </q-dialog>

    <q-dialog v-model="dialogBooleans.addMedicineDialog">
      <Dialog
        v-model="dialogBooleans.addMedicineDialog"
        @showNewDialog="showNewDialog($event)"
        :list="people"
        :keyInit="keyInit"
        :personPointer="personPointer"
        medicine=True
      />
    </q-dialog>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

import Header from '../components/Layout/Header.vue'
import Drawer from '../components/Layout/Drawer.vue'
import Dialog from '../components/Layout/Dialog.vue'

export default {
  name: 'Main-Layout',
  data () {
    return {
      dialogBooleans: {
        searchDialog: false,
        addPersonDialog: false,
        addMedicineDialog: false
      },
      keyInit: ''
    }
  },
  computed: {
    personPointer () {
      return this.$store.state.user.personPointer
    },
    medicinePointer () {
      return this.$store.state.user.medicinePointer
    },
    people () {
      return this.$store.state.user.people
    },
    filterForgotten () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut () {
      return this.$store.state.user.filterRunningOut
    },
    currentList () {
      if (this.personPointer !== null) {
        return this.people[this.personPointer]
      }
      return this.people
    },
    forgotAmount () {
      if (this.personPointer !== null) {
        return this.lookForAmount(this.currentList.medications, 'hasForgot')
      }
      return this.currentList.filter(person => (this.lookFor(person.medications, 'hasForgot'))).length
    },
    runningOutAmount () {
      if (this.personPointer !== null) {
        return this.lookForAmount(this.currentList.medications, 'isRunningOut')
      }
      return this.currentList.filter(person => (this.lookFor(person.medications, 'isRunningOut'))).length
    }
    //,
    // filteredList () {
    //   if (this.personPointer !== null) {
    //     return this.people[this.personPointer].filter(meds => (
    //       (!this.filterRunningOut && !this.filterForgotten) ||
    //       (this.lookFor(meds, 'hasForgot') && this.filterForgotten) ||
    //       (this.lookFor(meds, 'isRunningOut') && this.filterRunningOut)
    //     ))
    //   }
    //   return this.people.filter(person => (
    //     (!this.filterRunningOut && !this.filterForgotten) ||
    //     (this.lookFor(person.medications, 'hasForgot') && this.filterForgotten) ||
    //     (this.lookFor(person.medications, 'isRunningOut') && this.filterRunningOut)
    //   ))
    // }
  },
  components: {
    Header,
    Drawer,
    Dialog
  },
  methods: {
    showNewDialog (object) {
      this.dialogBooleans = object.dialogBooleans
      this.keyInit = object.key
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
  }
}
</script>
