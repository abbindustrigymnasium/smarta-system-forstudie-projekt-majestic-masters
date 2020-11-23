<template>
  <q-layout view="hHh Lpr lff">

    <Header @changeAddDialog="changeAddDialog()" @changeSearchDialog="changeSearchDialog()" :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
    <!-- <DrawerLeft :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/> -->

    <q-dialog v-model="showDialogSearch">
      <SearchDialog :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
    </q-dialog>

    <q-dialog v-model="showDialogAdd">
      <AddDialog :people="people" :personPointer="personPointer" :medicinePointer="medicinePointer"/>
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
// import DrawerLeft from '../components/Layout/DrawerLeft.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      showDialogSearch: false,
      showDialogAdd: false
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
    AddDialog
    // DrawerLeft
  },
  methods: {
    changeSearchDialog () {
      this.showDialogSearch = true
    },
    changeAddDialog () {
      this.showDialogAdd = true
    }
  }
}
</script>
