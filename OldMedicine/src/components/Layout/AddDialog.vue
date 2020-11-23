<template>
  <div id="Dialog-Layout">
    <q-card>
      <DialogPerson :people="people" :personPointer="personPointer" v-if="personPointer === null && medicinePointer === null"/>
      <DialogMedicine :person="people[personPointer]" :personPointer="personPointer" v-else-if="medicinePointer === null"/>
    </q-card>
  </div>
</template>

<script>

import DialogPerson from './AddDialog/DialogPerson.vue'
import DialogMedicine from './AddDialog/DialogMedicine.vue'

export default {
  name: 'Dialog-Layout-Add',
  props: ['people', 'personPointer', 'medicinePointer'],
  components: {
    DialogPerson,
    DialogMedicine
  }
}
</script>
