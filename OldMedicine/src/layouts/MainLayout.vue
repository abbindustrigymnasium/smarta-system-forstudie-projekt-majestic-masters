<template>
  <q-layout view="hHh Lpr fFf">

    <q-header class="bg-primary1 elevated" v-if="$q.platform.is.desktop">
      <Tabs
        @showNewDialog="showNewDialog($event)"
        :people="people"
        :personPointer="personPointer"
        :medicinePointer="medicinePointer"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
        :forgotAmount="forgotAmount"
        :runningOutAmount="runningOutAmount"
      />
    </q-header>

    <!-- <q-footer class="bg-primary1 elevated reveal sticky" v-else>
      <Tabs
        @showNewDialog="showNewDialog($event)"
        :people="people"
        :personPointer="personPointer"
        :medicinePointer="medicinePointer"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
        :forgotAmount="forgotAmount"
        :runningOutAmount="runningOutAmount"
      />
    </q-footer> -->

    <q-footer class="bg-primary1 elevated reveal sticky">
      <Header
        @showNewDialog="showNewDialog($event)"
        :people="people"
        :personPointer="personPointer"
        :medicinePointer="medicinePointer"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
        :forgotAmount="forgotAmount"
        :runningOutAmount="runningOutAmount"
      />
    </q-footer>

    <q-drawer v-if="1==2 && personPointer !== null && $q.platform.is.desktop" id="DrawerPerson" show-if-above :width="400" :breakpoint="200" bordered content-class="bg-grey-3 row">
      <Drawer class="col"
        v-if="personPointer !== null"
        :list="people"
        :personPointer="personPointer"
        :medicinePointer="null"
      />
      <Drawer class="col"
        v-if="medicinePointer !== null"
        :list="people[personPointer].medications"
        :personPointer="null"
        :medicinePointer="medicinePointer"
        :name="people[personPointer].name"
      />
    </q-drawer>

    <q-dialog v-model="dialogBooleans.searchDialog">
      <Dialog
        v-model="dialogBooleans.searchDialog"
        @showNewDialog="showNewDialog($event)"
        :list="currentList"
        :people="people"
        :personPointer="personPointer"
      />
    </q-dialog>

    <q-dialog v-model="dialogBooleans.addPersonDialog">
      <Dialog
        v-model="dialogBooleans.addPersonDialog"
        @showNewDialog="showNewDialog($event)"
        :people="people"
        :list="people"
        :keyInit="keyInit"
        person=True
      />
    </q-dialog>

    <q-dialog v-model="dialogBooleans.addMedicineDialog">
      <Dialog
        v-model="dialogBooleans.addMedicineDialog"
        @showNewDialog="showNewDialog($event)"
        :people="people"
        :list="people"
        :keyInit="keyInit"
        :personPointer="personPointer"
        medicine=True
      />
    </q-dialog>

    <q-page-container class="bg-light1">
      <router-view />
      <q-page-sticky v-if="personPointer === null && medicinePointer === null" class="bottom-right" :offset="[90, 20]">
        <q-btn
          round
          size="lg"
          class="bg-secondary1 text-white"
          icon="search"
          @click="showNewDialog({ dialogBooleans: { searchDialog: true, addPersonDialog: false, addMedicineDialog: false }, key: '' })"
        />
      </q-page-sticky>

      <q-page-sticky v-else-if="medicinePointer === null" class="bottom-right" :offset="[90, 20]">
        <q-btn
          round
          size="lg"
          class="bg-secondary1 text-white"
          icon="search"
          @click="showNewDialog({ dialogBooleans: { searchDialog: true, addPersonDialog: false, addMedicineDialog: false }, key: '' })"
        />
      </q-page-sticky>

      <q-page-sticky v-if="personPointer === null && medicinePointer === null" class="bottom-right" :offset="[20, 20]">
        <q-btn
          round
          size="lg"
          icon="person_add"
          class="bg-secondary1 text-white"
          @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: '' })"
        />
      </q-page-sticky>

      <q-page-sticky v-else-if="medicinePointer === null" class="bottom-right" :offset="[20, 20]">
        <q-btn
          round
          size="lg"
          icon="add"
          class="bg-secondary1 text-white"
          @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: '' })"
        />
      </q-page-sticky>
    </q-page-container>

  </q-layout>
</template>

<script>

import Tabs from '../components/Layout/Tabs.vue'
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
  mounted () {
    if (!this.$q.platform.is.desktop) {
      this.buttonHeight = 80
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
        return this.lookForForgotAmount(this.currentList.medications)
      }
      return this.currentList.filter(person => (this.lookForForgot(person.medications))).length
    },
    runningOutAmount () {
      if (this.personPointer !== null) {
        return this.lookForRunningOutAmount(this.currentList.medications)
      }
      return this.currentList.filter(person => (this.lookForRunningOut(person.medications))).length
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
    Tabs,
    Header,
    Drawer,
    Dialog
  },
  methods: {
    showNewDialog (object) {
      this.dialogBooleans = object.dialogBooleans
      this.keyInit = object.key
    },
    lookForForgotAmount (meds) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].hasForgot) {
          amount++
        }
      }
      return amount
    },
    lookForRunningOutAmount (meds) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].remind >= meds[i].amount * meds[i].interval) {
          amount++
        }
      }
      return amount
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
    // lookForAmount (meds, key) {
    //   let amount = 0
    //   for (let i = 0; i < meds.length; i++) {
    //     if (meds[i][key]) {
    //       amount++
    //     }
    //   }
    //   return amount
    // },
    // lookFor (meds, key) {
    //   for (let i = 0; i < meds.length; i++) {
    //     if (meds[i][key]) {
    //       return true
    //     }
    //   }
    //   return false
    // }
  }
}
</script>
