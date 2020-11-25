<template>
  <q-layout view="hHh Lpr lff">

    <Header
      @changeAddDialog="changeAddDialog()"
      @changeSearchDialog="changeSearchDialog()"
      :people="people"
      :personPointer="personPointer"
      :medicinePointer="medicinePointer"
    />

    <DrawerLeft v-if="personPointer !== null" :people="people" :personPointer="personPointer"/>

    <q-dialog v-model="showDialogSearch">
      <SearchDialog @changeKey="changeKey" @changeSearchDialog="changeSearchDialog" @changeAddDialog="changeAddDialog" :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
    </q-dialog>

    <q-dialog v-model="showDialogAdd">
      <AddDialog @changeKey="changeKey" :keyInit="keyInit" :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
    </q-dialog>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import Header from '../components/Layout/Header.vue'
import SearchDialog from '../components/Layout/SearchDialog.vue'
import AddDialog from '../components/Layout/AddDialog.vue'
import DrawerLeft from '../components/Layout/DrawerLeft.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      showDialogSearch: false,
      showDialogAdd: false,
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
    }
  },
  watch: {
    showDialogAdd (newBool, oldBool) {
      if (!newBool) {
        this.changeKey('')
      }
    }
  },
  components: {
    Header,
    SearchDialog,
    AddDialog,
    DrawerLeft
  },
  methods: {
    changeSearchDialog () {
      this.showDialogSearch = !this.showDialogSearch
    },
    changeAddDialog () {
      this.showDialogAdd = !this.showDialogAdd
    },
    changeKey (key) {
      this.keyInit = key
    }
  }
}
</script>
