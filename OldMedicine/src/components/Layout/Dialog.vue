<template>
  <div id="Dialog-Layout">
    <q-card>
      <div>
        <q-input v-if="medicinePerson" outlined v-model="name" :label="`Skriv in ${medicinePerson} namn`"/>
        <q-input v-if="medicinePerson === 'personens'" outlined v-model="id" label="Skriv in enhetens ID"/>
        <q-input v-else-if="medicinePerson === 'medicinens'" outlined v-model="amount" label="Skriv in antalet tabletter"/>
        <q-input v-if="!medicinePerson" outlined v-model="searchKey" label="Vart vill du gå?"/>
      </div>

      <List @showNewDialog="showNewDialog($event)" :list="searchList"/>

      <!-- error messages -->
      <div white-space: pre-line v-if="noResults || invalidInput">
        <p>{{ errorMessage }}</p>
        <q-btn v-if="noResults && personPointer === null" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: searchKey })">Ja</q-btn>
        <q-btn v-else-if="noResults" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: searchKey })">Ja</q-btn>
      </div>

      <div v-if="medicinePerson">
        <q-btn @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
        <q-btn @click="createNew()" :disabled="invalidInput">Lägg till</q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'Dialog-Layout',
  props: ['list', 'keyInit', 'personPointer', 'medicinePerson'],
  data () {
    return {
      name: this.keyInit,
      id: '',
      amount: 0,
      searchKey: '',
      searchList: [],
      errorMessage: '',
      noResults: false,
      invalidInput: false
    }
  },
  mounted () {
    if (this.medicinePerson && this.keyInit === '') {
      this.errorMessage = 'Namn fältet får ej vara tomt!'
      this.invalidInput = true
    } else if (this.medicinePerson === 'personens') {
      this.errorMessage = 'Felaktigt ID'
      this.invalidInput = true
    }
  },
  watch: {
    searchKey (newKey, oldKey) {
      this.searchList = []
      if (newKey !== '') {
        for (var i = 0; i < this.list.length; i++) {
          for (var q = 0; q < this.list[i].medications.length; q++) {
            if (this.list[i].medications[q].name.toLowerCase().includes(newKey)) {
              this.searchList.push({ isPerson: false, item: this.list[i].medications[q], personPointer: this.list[i].index, personName: this.list[i].name })
            }
          }
          if (this.list[i].name.toLowerCase().includes(newKey) && this.personPointer === null) {
            this.searchList.push({ isPerson: true, item: this.list[i] })
          }
        }
      }
      if (!this.searchList.length && newKey !== '') {
        let subject = ''
        if (this.personPointer === null) {
          subject = 'personen'
        } else {
          subject = 'medicinen'
        }
        this.noResults = true
        this.errorMessage = `Hittar ingen som heter '${newKey}'. \n Vill du lägga till den ${subject}?`
      } else {
        this.noResults = false
      }
    },
    name (newName, oldName) {
      this.validOptions()
    },
    id (newId, oldId) {
      this.validOptions()
    },
    amount (newAmount, oldAmount) {
      this.validOptions()
    }
  },
  methods: {
    showNewDialog (object) {
      console.log(object)
      this.$emit('showNewDialog', object)
    },
    validOptions () {
      if (this.id === '' && this.medicinePerson === 'personens') {
        this.invalidInput = true
        this.errorMessage = 'Felaktigt ID'
      } else if (this.medicinePerson === 'personens') {
        this.invalidInput = false
      }
      if (this.name === '' && this.medicinePerson) {
        this.invalidInput = true
        this.errorMessage = 'Namn fältet får ej vara tomt!'
      } else if (this.medicinePerson === 'medicinens') {
        this.invalidInput = false
      }
      for (var i = 0; i < this.list.length; i++) {
        if (this.id === this.list[i].id) {
          this.invalidInput = true
          this.errorMessage = 'Felaktigt ID. Redan använt'
          break
        }
      }
      if (isNaN(parseInt(this.amount)) && this.name !== '') {
        this.invalidInput = true
        this.errorMessage = `${this.amount} är inte ett nummer`
      } else if (this.name !== '') {
        this.invalidInput = false
      }
    },
    createNew () {
      this.showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })
      if (this.medicinePerson === 'personens') {
        this.$store.commit('user/addPerson', { name: this.name, id: this.id })
      } else {
        this.$store.commit('user/addMedicine', { state: this.personPointer, name: this.name, amount: this.amount })
      }
    }
  },
  components: {
    List
  }
}

</script>
