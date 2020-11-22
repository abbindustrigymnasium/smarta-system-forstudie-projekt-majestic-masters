<template>
  <q-layout view="hHh Lpr lff">

    <Header @changeAddPersonDialog="changeAddPersonDialog()" @changeSearchDialog="changeSearchDialog()" :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
    <!-- <DrawerLeft :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/> -->

    <q-dialog v-model="showDialogSearch">
      <SearchDialog :people="people"/>
    </q-dialog>

    <q-dialog v-model="showDialogAddPerson">
      <AddPersonDialog :people="people"/>
    </q-dialog>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

import Header from '../components/Layout/Header.vue'
import SearchDialog from '../components/Layout/SearchDialog.vue'
import AddPersonDialog from '../components/Layout/AddPersonDialog.vue'
// import DrawerLeft from '../components/Layout/DrawerLeft.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      showDialogSearch: false,
      showDialogAddPerson: false
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
  components: {
    Header,
    SearchDialog,
    AddPersonDialog
    // DrawerLeft
  },
  methods: {
    changeSearchDialog () {
      this.showDialogSearch = true
    },
    changeAddPersonDialog () {
      this.showDialogAddPerson = true
    }
  }
}
</script>
