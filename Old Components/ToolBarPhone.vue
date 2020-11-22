<template>
  <div class="bg-primary text-white fixed-bottom">
    <q-toolbar>
      <q-breadcrumbs active-color="white" style="font-size: 16px">
        <q-breadcrumbs-el label="Personer" icon="people" to="/People"></q-breadcrumbs-el>
        <q-breadcrumbs-el v-if="personPointer !== null" :label="people[personPointer].namn" icon="person" to="/Person"></q-breadcrumbs-el>
        <q-breadcrumbs-el v-if="medicinePointer !== null" :label="people[personPointer].mediciner[medicinePointer].namn" icon="medical_services"></q-breadcrumbs-el>
      </q-breadcrumbs>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolBarPhone',
  props: ['people', 'personPointer', 'medicinePointer']
}
</script>
