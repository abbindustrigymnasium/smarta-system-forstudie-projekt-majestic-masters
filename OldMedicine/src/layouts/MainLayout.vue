<template>
  <q-layout view="lHh Lpr lFf">

    <!-- <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title v-if="url === 1" class="text-center">
          Personer
        </q-toolbar-title>
        <q-toolbar-title v-else-if="url === 2" class="text-center">
          {{ person }}
        </q-toolbar-title>
        <q-toolbar-title v-else class="text-center">
          {{ medicine }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="bg-primary text-white fixed-bottom">
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Personer" icon="people" to="/People"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="url >= 2" :label="person" icon="person" to="/People/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="url >= 3" :label="medicine" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </div>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      // url: null,
      // person: null,
      // medicine: null
    }
  },
  computed: {
    url () {
      return this.$store.state.user.url
    },
    person () {
      return this.$store.state.user.person
    },
    medicine () {
      return this.$store.state.user.medicine
    }
  }
  // },
  // watch: {
  //   url (newCount, oldCount) {
  //     // Our fancy notification (2).
  //     // console.log(`We have ${newCount} fruits now, yay!`)
  //   }
  // }

  // watch: {
  //   url: function () {
  //     this.url = this.$store.state.user.url
  //   },
  //   person: function () {
  //     this.person = this.$store.state.user.person
  //   },
  //   medicine: function () {
  //     this.medicine = this.$store.state.user.medicine
  //   }
  // }
}
</script>
