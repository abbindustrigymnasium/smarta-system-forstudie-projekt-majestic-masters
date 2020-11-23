<template>
  <div id="Dialog-Person">
    <q-input outlined v-model="name" label="Skriv in medicinens namn">
    </q-input>
    <q-input outlined v-model="amount" label="Skriv in antalet tabletter">
    </q-input>

    <p class="text-red" v-if="invalidName">Namn fältet får ej vara tomt!</p>

    <q-btn v-close-popup>Avbryt</q-btn>
    <q-btn v-close-popup="buttonPress" @click="addMedicine()" :disabled="invalidName">Lägg till medicine</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Dialog-Layout-Add-Medicine',
  props: ['people', 'personPointer'],
  data () {
    return {
      name: '',
      amount: '',
      invalidName: true,
      buttonPress: false
    }
  },
  watch: {
    name: function (newName, oldName) {
      this.validOptions()
    }
  },
  methods: {
    validOptions () {
      if (this.name === '') {
        this.invalidName = true
      } else {
        this.invalidName = false
      }
    },
    addMedicine () {
      this.buttonPress = true
      this.$store.commit('user/addMedicine', { state: this.personPointer, name: this.name, amount: this.amount })
    }
  }
}

</script>
