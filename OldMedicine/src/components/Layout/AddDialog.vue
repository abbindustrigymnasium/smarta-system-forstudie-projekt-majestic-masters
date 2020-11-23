<template>
  <div id="Dialog-Layout">
    <q-card>
      <DialogPerson @changeKey="changeKey" :keyInit="keyInit" :people="people" :personPointer="personPointer" v-if="personPointer === null && medicinePointer === null"/>
      <DialogMedicine @changeKey="changeKey" :keyInit="keyInit" :person="people[personPointer]" :personPointer="personPointer" v-else-if="medicinePointer === null"/>
    </q-card>
  </div>
</template>

<script>

import DialogPerson from './AddDialog/DialogPerson.vue'
import DialogMedicine from './AddDialog/DialogMedicine.vue'

export default {
  name: 'Dialog-Layout-Add',
  props: ['people', 'personPointer', 'medicinePointer', 'keyInit'],
  components: {
    DialogPerson,
    DialogMedicine
  },
  methods: {
    changeKey () {
      this.$emit('changeKey', '')
    }
  }
}
</script>
