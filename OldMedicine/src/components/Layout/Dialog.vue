<template>
  <div id="Dialog-Layout">
    <q-card>
      <div>
        <q-input v-if="person" outlined v-model="dialogsObjects.addPerson.name" :label="`Skriv in personens namn`"/>
        <q-input v-else-if="medicine" outlined v-model="dialogsObjects.addMedicine.name" :label="`Skriv in medicinens namn`"/>
        <q-input v-if="person" outlined v-model="dialogsObjects.addPerson.id" label="Skriv in enhetens ID"/>
        <q-input v-else-if="medicine" type='number' outlined v-model="dialogsObjects.addMedicine.amount" label="Skriv in antalet tabletter"/>
        <q-input v-if="!medicine && !person" outlined v-model="dialogsObjects.search.key" label="Vart vill du gå?"/>
      </div>

      <List @showNewDialog="showNewDialog($event)" :list="dialogsObjects.search.list" :personPointer="personPointer"/>
      <!-- {{ dialogsObjects.search.error }} <br>
      {{ dialogsObjects.addPerson.error }}<br>
      {{ dialogsObjects.addMedicine.error }} -->
      <!-- error messages ITTERERA igenom alla? -->
      <div
        white-space:
        pre-line
        v-if="
          dialogsObjects.search.error.list !== '' ||
          dialogsObjects.addPerson.error.name !== '' ||
          dialogsObjects.addPerson.error.id !== '' ||
          dialogsObjects.addMedicine.error.name !== '' ||
          dialogsObjects.addMedicine.error.amount !== ''
        ">
        <template v-for="obj in dialogsObjects">
          <template v-for="error in obj.error">
            {{ error }}
          </template>
        </template>
        <q-btn v-if="!medicine && !person && personPointer === null" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: dialogsObjects.search.key })">Ja</q-btn>
        <q-btn v-else-if="!medicine && !person" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: dialogsObjects.search.key })">Ja</q-btn>
      </div>

      <div v-if="medicine || person">
        <q-btn @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
        <q-btn @click="createNew()" :disabled="dialogsObjects.addPerson.error.name !== '' || dialogsObjects.addPerson.error.id !== '' || dialogsObjects.addMedicine.error.name !== ''">Lägg till</q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'Dialog-Layout',
  props: ['list', 'keyInit', 'personPointer', 'person', 'medicine'],
  data () {
    return {
      dialogsObjects: {
        search: {
          key: '',
          list: [],
          error: {
            list: ''
            // message: ['Hittar ingen som heter __. \n Vill du lägga till den __?']
          }
        },
        addPerson: {
          name: '',
          id: '',
          error: {
            name: '',
            id: ''
            // message: ['Namn fältet får ej vara tomt!', 'Ogiltigt ID', 'Ogiltigt ID, redan använt']
          }
        },
        addMedicine: {
          name: '',
          amount: 0,
          error: {
            name: '',
            amount: ''
            // message: ['Namn fältet får ej vara tomt!']
          }
        }
      }
    }
  },
  mounted () {
    if (this.person) {
      this.dialogsObjects.addPerson.error.id = 'Ogiltigt ID'
      this.dialogsObjects.addPerson.name = this.keyInit
      if (this.dialogsObjects.addPerson.name === '') {
        this.dialogsObjects.addPerson.error.name = 'Namn fältet får ej vara tomt!'
      }
    } else if (this.medicine) {
      this.dialogsObjects.addMedicine.name = this.keyInit
      if (this.dialogsObjects.addMedicine.name === '') {
        this.dialogsObjects.addMedicine.error.name = 'Namn fältet får ej vara tomt!'
      }
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
    'dialogsObjects.search.key' (newKey, oldKey) {
      this.dialogsObjects.search.list = []
      if (this.personPointer === null && newKey !== '') {
        for (var i = 0; i < this.list.length; i++) {
          for (var q = 0; q < this.list[i].medications.length; q++) {
            if (this.list[i].medications[q].name.toLowerCase().includes(newKey)) {
              this.dialogsObjects.search.list.push({ isPerson: false, item: this.list[i].medications[q], personPointer: this.list[i].index, personName: this.list[i].name })
            }
          }
          if (this.list[i].name.toLowerCase().includes(newKey) && this.personPointer === null) {
            this.dialogsObjects.search.list.push({ isPerson: true, item: this.list[i] })
          }
        }
      } else if (newKey !== '') {
        for (var r = 0; r < this.list.medications.length; r++) {
          if (this.list.medications[r].name.toLowerCase().includes(newKey)) {
            this.dialogsObjects.search.list.push({ isPerson: false, item: this.list.medications[r], personPointer: this.list.index, personName: this.list.name })
          }
        }
      }

      if (!this.dialogsObjects.search.list.length && newKey !== '') {
        let subject = ''
        if (this.personPointer === null) {
          subject = 'personen'
        } else {
          subject = 'medicinen'
        }
        this.dialogsObjects.search.error.list = `Hittar ingen som heter '${newKey}'. \n Vill du lägga till den ${subject}?`
      } else {
        this.dialogsObjects.search.error.list = ''
      }
    },
    'dialogsObjects.addPerson.name' (newName, oldName) {
      if (newName === '') {
        this.dialogsObjects.addPerson.error.name = 'Namn fältet får ej vara tomt!'
      } else {
        this.dialogsObjects.addPerson.error.name = ''
      }
    },
    'dialogsObjects.addPerson.id' (newId, oldId) {
      if (newId === '') {
        this.dialogsObjects.addPerson.error.id = 'Ogiltigt ID'
      } else {
        this.dialogsObjects.addPerson.error.id = ''
        for (var i = 0; i < this.list.length; i++) {
          if (newId === this.list[i].id) {
            this.dialogsObjects.addPerson.error.id = 'Ogiltigt ID, redan använt'
            break
          }
        }
      }
    },
    'dialogsObjects.addMedicine.name' (newName, oldName) {
      if (newName === '') {
        this.dialogsObjects.addMedicine.error.name = 'Namn fältet får ej vara tomt!'
      } else {
        this.dialogsObjects.addMedicine.error.name = ''
      }
    },
    'dialogsObjects.addMedicine.amount' (newAmount, oldAmount) {
      if (newAmount === null || newAmount === '' || newAmount < 0 || !Number.isInteger(parseInt(newAmount))) {
        this.dialogsObjects.addMedicine.error.amount = 'Ogiltig mängd'
      } else {
        this.dialogsObjects.addMedicine.error.amount = ''
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
        this.$store.commit('user/addPerson', { index: this.$store.state.user.people.length, name: this.dialogsObjects.addPerson.name, id: this.dialogsObjects.addPerson.id })
      } else {
        const lengtsada = this.$store.state.user.people[this.$store.state.user.personPointer].medications.length
        console.log(this.$store.state.user.people[this.$store.state.user.personPointer].medications.length, this.$store.state.user.people, this.$store.state.user.personPointer)
        this.$store.commit('user/addMedicine', { index: lengtsada, personPointer: this.$store.state.user.personPointer, name: this.dialogsObjects.addMedicine.name, amount: this.dialogsObjects.addMedicine.amount })
      }
    }
  },
  components: {
    List
  }
}

</script>
