<template>
  <div id="Dialog-Layout">
    <q-card>
      <div>
        <q-input v-if="person" outlined v-model="personName" :label="`Skriv in personens namn`"/>
        <q-input v-else-if="medicine" outlined v-model="medicineName" :label="`Skriv in medicinens namn`"/>
        <q-input v-if="person" outlined v-model="id" label="Skriv in enhetens ID"/>
        <q-input v-else-if="medicine" outlined v-model="amount" label="Skriv in antalet tabletter"/>
        <q-input v-if="!medicine && !person" outlined v-model="searchKey" label="Vart vill du gå?"/>
      </div>

      <List @showNewDialog="showNewDialog($event)" :list="searchList"/>

      <!-- error messages -->
      <div white-space: pre-line v-if="errorMessage !== ''">
        <p>{{ errorMessage }}</p>
        <q-btn v-if="!medicine && !person && personPointer === null" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: searchKey })">Ja</q-btn>
        <q-btn v-else-if="!medicine && !person" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: searchKey })">Ja</q-btn>
      </div>

      <div v-if="medicine && person">
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
  props: ['list', 'keyInit', 'personPointer', 'medicine', 'person'],
  data () {
    return {
      personName: '',
      medicineName: '',
      id: '',
      amount: 0,
      searchKey: '',
      searchList: [],
      errorMessage: ''
    }
  },
  mounted () {
    if (this.medicine) {
      this.medicineName = this.keyInit
    } else if (this.person) {
      this.personName = this.keyInit
    }
    // if (this.medicinePerson && this.keyInit === '') {
    //   this.errorMessage = 'Namn fältet får ej vara tomt!'
    //   this.invalidInput = true
    // } else if (this.medicinePerson === 'personens') {
    //   this.errorMessage = 'Felaktigt ID'
    //   this.invalidInput = true
    // }
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
        this.errorMessage = `Hittar ingen som heter '${newKey}'. \n Vill du lägga till den ${subject}?`
      } else {
        this.errorMessage = ''
      }
    },
    personName (newName, oldName) {
      if (newName === '') {
        this.errorMessage = 'Namn fältet får ej vara tomt!'
      }
    },
    medicineName (newName, oldName) {
      if (newName === '') {
        this.errorMessage = 'Namn fältet får ej vara tomt!'
      }
    },
    id (newId, oldId) {
      if (newId === '') {
        this.errorMessage = 'Felaktigt ID'
      } else {
        for (var i = 0; i < this.list.length; i++) {
          if (newId === this.list[i].id) {
            this.errorMessage = 'Felaktigt ID. Redan använt'
            break
          }
        }
      }
    },
    amount (newAmount, oldAmount) {
      if (isNaN(parseInt(newAmount))) {
        this.errorMessage = `${newAmount} är inte ett nummer`
      }
    }
  },
  methods: {
    showNewDialog (object) {
      this.$emit('showNewDialog', object)
    },
    createNew () {
      this.showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })
      if (this.person) {
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
