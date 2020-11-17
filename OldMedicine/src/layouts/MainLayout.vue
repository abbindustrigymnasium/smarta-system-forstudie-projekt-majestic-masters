<template>
  <q-layout view="lHh Lpr lFf">
    <p>{{ personPointer }} <br> {{ medicinePointer }} <br> {{ people }}</p>
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
          <q-breadcrumbs-el v-if="url >= 2" :label="people[personPointer].namn" icon="person" to="/People/Person"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="url >= 3" :label="people[personPointer].mediciner[medicinePointer].namn" icon="medical_services"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-toolbar>
    </div>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  computed: {
    url () {
      return this.$store.state.user.url
    },
    personPointer () {
      return this.$store.state.user.personPointer
    },
    medicinePointer () {
      return this.$store.state.user.medicinePointer
    },
    people () {
      return this.$store.state.user.people
    }
  }
}
</script>
