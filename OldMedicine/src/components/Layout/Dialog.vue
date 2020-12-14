<template>
  <div id="Dialog-Layout">
    <q-card>
      <div>
        <q-input v-if="person" outlined v-model="dialogsObjects.addPerson.name" :label="`Skriv in personens namn`"/>
        <q-input v-else-if="medicine" outlined v-model="dialogsObjects.addMedicine.name" :label="`Skriv in medicinens namn`"/>
        <q-input v-if="person" outlined v-model="dialogsObjects.addPerson.id" label="Skriv in enhetens ID"/>
        <q-input v-else-if="medicine" type='number' outlined v-model="dialogsObjects.addMedicine.amount" label="Skriv in antalet tabletter"/>
        <q-card v-if="medicine">
          Intervall
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.interval.days" label="Dagar"/>
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.interval.hours" label="Timmar"/>
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.interval.minutes" label="Minuter"/>
        </q-card>
        <q-card v-if="medicine">
          Påminnelse när det tar slut
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.remind.days" label="Dagar"/>
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.remind.hours" label="Timmar"/>
          <q-input type='number' outlined v-model="dialogsObjects.addMedicine.remind.minutes" label="Minuter"/>
        </q-card>
        <q-input v-if="!medicine && !person" outlined v-model="dialogsObjects.search.key" label="Vart vill du gå?"/>
      </div>

      <List @showNewDialog="showNewDialog($event)" :list="dialogsObjects.search.list" :personPointer="personPointer" :people="list"/>

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
        <q-btn @click="createNew()" :disabled="dialogsObjects.addPerson.error.name !== '' || dialogsObjects.addPerson.error.id !== '' || dialogsObjects.addMedicine.error.name !== '' || dialogsObjects.addMedicine.error.interval !== '' || dialogsObjects.addMedicine.error.remind !== ''">Lägg till</q-btn>
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
          }
        },
        addPerson: {
          name: '',
          id: '',
          error: {
            name: '',
            id: ''
          }
        },
        addMedicine: {
          name: '',
          amount: 0,
          interval: { days: 0, hours: 0, minutes: 0 },
          remind: { days: 0, hours: 0, minutes: 0 },
          error: {
            name: '',
            amount: '',
            interval: '',
            remind: ''
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
  },
  watch: {
    'dialogsObjects.search.key' (newKey, oldKey) {
      this.dialogsObjects.search.list = []
      if (this.personPointer === null && newKey !== '') {
        for (var i = 0; i < this.list.length; i++) {
          for (var q = 0; q < this.list[i].medications.length; q++) {
            if (this.list[i].medications[q].name.toLowerCase().includes(newKey)) {
              this.dialogsObjects.search.list.push(this.list[i].medications[q])
            }
          }
          if (this.list[i].name.toLowerCase().includes(newKey)) {
            this.dialogsObjects.search.list.push(this.list[i])
          }
        }
      } else if (newKey !== '') {
        for (var r = 0; r < this.list.medications.length; r++) {
          if (this.list.medications[r].name.toLowerCase().includes(newKey)) {
            this.dialogsObjects.search.list.push(this.list.medications[r])
          }
        }
      }

      if (!this.dialogsObjects.search.list.length && newKey !== '') {
        if (this.personPointer === null) {
          this.dialogsObjects.search.error.list = `Hittar ingen som heter '${newKey}'. \n Vill du lägga till den personen?`
        } else {
          this.dialogsObjects.search.error.list = `Hittar inget med '${newKey}'. \n Vill du lägga till den medicinen?`
        }
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
      this.dialogsObjects.addMedicine.error.amount = this.validInt(newAmount, 'Ogiltig mängd')
    },
    'dialogsObjects.addMedicine.interval.days' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.interval = this.validInt(newAmount, 'Ogiltig datum för intervall')
    },
    'dialogsObjects.addMedicine.interval.hours' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.interval = this.validInt(newAmount, 'Ogiltig datum för intervall')
    },
    'dialogsObjects.addMedicine.interval.minutes' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.interval = this.validInt(newAmount, 'Ogiltig datum för intervall')
    },
    'dialogsObjects.addMedicine.remind.days' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.remind = this.validInt(newAmount, 'Ogiltig datum för påminnelse')
    },
    'dialogsObjects.addMedicine.remind.hours' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.remind = this.validInt(newAmount, 'Ogiltig datum för påminnelse')
    },
    'dialogsObjects.addMedicine.remind.minutes' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.remind = this.validInt(newAmount, 'Ogiltig datum för påminnelse')
    }
  },
  methods: {
    showNewDialog (object) {
      this.$emit('showNewDialog', object)
    },
    validInt (value, error) {
      if (value === null || value === '' || value < 0 || !Number.isInteger(parseInt(value))) {
        return error
      } else {
        return ''
      }
    },
    createNew () {
      this.showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })
      if (this.person) {
        this.$store.commit('user/addPerson', { name: this.dialogsObjects.addPerson.name, id: this.dialogsObjects.addPerson.id })
      } else {
        // const lengtsada = this.$store.state.user.people[this.$store.state.user.personPointer].medications.length
        // console.log(this.$store.state.user.people[this.$store.state.user.personPointer].medications.length, this.$store.state.user.people, this.$store.state.user.personPointer)
        this.$store.commit('user/addMedicine', {
          personPointer: this.$store.state.user.personPointer,
          name: this.dialogsObjects.addMedicine.name,
          amount: this.dialogsObjects.addMedicine.amount,
          interval: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.interval.days + 1000 * 60 * 60 * this.dialogsObjects.addMedicine.interval.hours + 1000 * 60 * this.dialogsObjects.addMedicine.interval.minutes,
          remind: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.remind.days + 1000 * 60 * 60 * this.dialogsObjects.addMedicine.remind.hours + 1000 * 60 * this.dialogsObjects.addMedicine.remind.minutes
        })
        console.log(this.$store.state.user.people)
      }
    }
  },
  components: {
    List
  }
}

</script>
