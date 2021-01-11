<template>
  <q-card style="width: 85vh" id="Dialog-Layout">
    <q-card-section class="q-pb-none">
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1 row text-center" v-if="!medicine && !person">
        <p v-if="personPointer === null">
          Sök efter personer och mediciner
        </p>
        <p v-else>
          Sök efter mediciner som {{ people[personPointer].name }} tar
        </p>
      </q-item>
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1 row text-center" v-if="person">
        <p>
          Lägg till en person
        </p>
      </q-item>
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1 row text-center" v-else-if="medicine">
        <p>
          Lägg till en medicin som {{ people[personPointer].name }} ska ta
        </p>
      </q-item>
    </q-card-section>

    <q-card-actions v-if="!medicine && !person" class="row items-center q-pt-none">
      <q-input color="primary2" class="col" outlined v-model="dialogsObjects.search.key" label="Vart vill du gå?"/>
    </q-card-actions>
    <q-card-actions v-if="person" class="column items-stretch q-pt-none">
      <q-input color="primary2" class="col" outlined v-model="dialogsObjects.addPerson.name" label="Skriv in personens namn"/>
      <q-input color="primary2" class="col" outlined v-model="dialogsObjects.addPerson.id" label="Skriv in enhetens ID"/>
    </q-card-actions>

    <q-card-actions v-else-if="medicine" class="column items-stretch q-pt-none">

      <q-input color="primary2" class="col q-pb-sm" outlined v-model="dialogsObjects.addMedicine.name" label="Skriv in medicinens namn"/>
      <q-input color="primary2" class="col q-pb-md" type='number' outlined v-model="dialogsObjects.addMedicine.amount" label="Skriv in antalet tabletter"/>

      <q-item class="column q-pa-none q-pb-md">
        <p class="row q-pa-none q-ma-none text-primary2">När medicinen ska börja tas</p>
        <q-item class="row q-pa-none">
          <q-input color="primary2" class="col q-pr-sm" outlined type="date" v-model="dialogsObjects.addMedicine.date"/>
          <q-input color="primary2" class="col" outlined type="time" v-model="dialogsObjects.addMedicine.time"/>
        </q-item>
      </q-item>

      <q-item class="column q-pa-none q-pb-md">
        <p class="row q-pa-none q-ma-none text-primary2">Hur ofta medicinen ska tas</p>
        <q-item class="row q-pa-none">
          <q-input color="primary2" class="col q-pr-sm" outlined type="number" label="Dagar" v-model="dialogsObjects.addMedicine.interval.days"/>
          <q-input color="primary2" class="col" outlined type="number" label="Timmar" v-model="dialogsObjects.addMedicine.interval.hours"/>
        </q-item>
      </q-item>

      <q-item class="column q-pa-none">
        <p class="row q-pa-none q-ma-none text-primary2">Påminn mig inann medicinen tar slut</p>
        <q-item class="row q-pa-none">
          <q-input color="primary2" class="col" label="Dagar" outlined type="number" v-model="dialogsObjects.addMedicine.remind"/>
        </q-item>
      </q-item>

    </q-card-actions>

    <q-card-actions v-if="!medicine && !person" class="q-pb-none">
      <q-card-section class="col">
        <q-item-label style="white-space: nowrap">Söker bland {{ listAmount }} föremål</q-item-label>
        <q-item-label style="white-space: nowrap" caption>Filtrerad sökning gav {{ dialogsObjects.search.list.length }} resultat</q-item-label>
      </q-card-section>

      <q-card-actions align="right" class="col">
        <q-btn v-if="dialogsObjects.search.error.list === ''" color="negative" flat @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
      </q-card-actions>
    </q-card-actions>

    <q-scroll-area v-if="!medicine && !person && dialogsObjects.search.error.list === ''" class="q-pa-none items-start" style="height: 32vh">
      <List class="full-width" @showNewDialog="showNewDialog($event)" :list="dialogsObjects.search.list" :personPointer="personPointer" :people="people"/>
    </q-scroll-area>

    <!-- FUCKING EWWWWWW, DISCUSTING, WHAT HAVE I CREATED -->
    <q-card-section
      class="q-pt-none q-pl-none"
      white-space:
      pre-line
      v-if="
        dialogsObjects.search.error.list !== '' ||
        dialogsObjects.addPerson.error.name !== '' ||
        dialogsObjects.addPerson.error.id !== '' ||
        dialogsObjects.addMedicine.error.name !== '' ||
        dialogsObjects.addMedicine.error.amount !== '' ||
        dialogsObjects.addMedicine.error.time !== '' ||
        dialogsObjects.addMedicine.error.date !== '' ||
        dialogsObjects.addMedicine.error.days !== '' ||
        dialogsObjects.addMedicine.error.hours !== '' ||
        dialogsObjects.addMedicine.error.bothIsZero !== '' ||
        dialogsObjects.addMedicine.error.remind !== ''
      ">

      <q-list class="text-negative text-body2">

        <q-item class="column q-pt-none q-pb-none" v-if="dialogsObjects.search.error.list !== ''">
          <p>{{ dialogsObjects.search.error.list }}</p>
          <p class="text-primary2">{{ dialogsObjects.search.error.thing }}</p>
        </q-item>

        <q-item v-if="dialogsObjects.addPerson.error.name !== ''">
          {{ dialogsObjects.addPerson.error.name }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addPerson.error.id !== ''">
          {{ dialogsObjects.addPerson.error.id }}
        </q-item>

        <q-item v-if="dialogsObjects.addMedicine.error.name !== ''">
          {{ dialogsObjects.addMedicine.error.name }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.amount !== ''">
          {{ dialogsObjects.addMedicine.error.amount }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.date !== ''">
          {{ dialogsObjects.addMedicine.error.date }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.time !== ''">
          {{ dialogsObjects.addMedicine.error.time }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.days !== ''">
          {{ dialogsObjects.addMedicine.error.days }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.hours !== ''">
          {{ dialogsObjects.addMedicine.error.hours }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.bothIsZero !== ''">
          {{ dialogsObjects.addMedicine.error.bothIsZero }}
        </q-item>
        <q-item v-else-if="dialogsObjects.addMedicine.error.remind !== ''">
          {{ dialogsObjects.addMedicine.error.remind }}
        </q-item>

      </q-list>

      <q-card-actions align="right" class="row" v-if="!medicine && !person">
        <q-btn color="negative" flat @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
        <q-btn color="primary1" flat v-if="!medicine && !person && personPointer === null" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: dialogsObjects.search.key })">Ja</q-btn>
        <q-btn color="primary1" flat v-else-if="!medicine && !person" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: dialogsObjects.search.key })">Ja</q-btn>
      </q-card-actions>

    </q-card-section>

    <q-card-section v-else-if="medicine || person" class="q-pt-none q-pl-none row" white-space: pre-line>
      <q-list class="text-negative text-body2">
        <q-item class="column q-pt-none q-pb-none">
          <p></p>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right" v-if="medicine || person">
      <q-btn color="negative" flat @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
      <q-btn color="primary1" flat @click="createNew()" :disabled="dialogsObjects.addPerson.error.name !== '' || dialogsObjects.addPerson.error.id !== '' ||         dialogsObjects.addMedicine.error.name !== '' || dialogsObjects.addMedicine.error.amount !== '' || dialogsObjects.addMedicine.error.time !== '' || dialogsObjects.addMedicine.error.date !== '' || dialogsObjects.addMedicine.error.days !== '' || dialogsObjects.addMedicine.error.hours !== '' || dialogsObjects.addMedicine.error.bothIsZero !== '' || dialogsObjects.addMedicine.error.remind !== ''">Lägg till</q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>

import List from '../List.vue'

export default {
  name: 'Dialog-Layout',
  props: ['list', 'keyInit', 'personPointer', 'person', 'medicine', 'people'],
  data () {
    return {
      listAmount: null,
      dialogsObjects: {
        search: {
          key: null,
          list: [],
          error: {
            list: '',
            thing: ''
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
          date: '',
          time: '',
          interval: { days: 0, hours: 0 },
          remind: 0,
          error: {
            name: '',
            amount: '',
            date: '',
            time: '',
            days: '',
            hours: '',
            bothIsZero: '',
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
      this.dialogsObjects.addMedicine.error.date = 'Ogiltigt datum för när medicinen ska börja tas'
      this.dialogsObjects.addMedicine.error.time = 'Ogiltigt tid för när medicinen ska börja tas'
      this.dialogsObjects.addMedicine.error.bothIsZero = 'Medicinen kan ej tas på sådant kort intervall'
    } else {
      this.dialogsObjects.search.key = ''
    }
  },
  watch: {
    'dialogsObjects.search.key' (newKey, oldKey) {
      this.dialogsObjects.search.list = []
      this.listAmount = 0
      if (this.personPointer === null) {
        for (var i = 0; i < this.list.length; i++) {
          for (var q = 0; q < this.list[i].medications.length; q++) {
            this.listAmount++
            if (this.list[i].medications[q].name.toLowerCase().includes(newKey.toLowerCase()) && newKey !== '') {
              this.dialogsObjects.search.list.push(this.list[i].medications[q])
            }
          }
          this.listAmount++
          if (this.list[i].name.toLowerCase().includes(newKey.toLowerCase()) && newKey !== '') {
            this.dialogsObjects.search.list.push(this.list[i])
          }
        }
      } else {
        for (var r = 0; r < this.list.medications.length; r++) {
          this.listAmount++
          if (this.list.medications[r].name.toLowerCase().includes(newKey.toLowerCase()) && newKey !== '') {
            this.dialogsObjects.search.list.push(this.list.medications[r])
          }
        }
      }

      if (!this.dialogsObjects.search.list.length && newKey !== '') {
        if (this.personPointer === null) {
          this.dialogsObjects.search.error.list = `Tyvärr så hittar vi inget som heter '${newKey}'.`
          this.dialogsObjects.search.error.thing = `Vill du lägga till '${newKey}' som en person?`
        } else {
          this.dialogsObjects.search.error.list = `Tyvärr så hittar vi inte medicinen '${newKey}'.`
          this.dialogsObjects.search.error.thing = 'Vill du lägga till den medicinen?'
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
      this.dialogsObjects.addMedicine.error.amount = this.validInt(newAmount, 'Ogiltig mängd tabletter')
    },
    'dialogsObjects.addMedicine.date' (newDate, oldDate) {
      if (newDate === '') {
        this.dialogsObjects.addMedicine.error.date = 'Ogiltigt datum för när medicinen ska börja tas'
      } else {
        this.dialogsObjects.addMedicine.error.date = ''
      }
    },
    'dialogsObjects.addMedicine.time' (newDate, oldAmount) {
      if (newDate === '') {
        this.dialogsObjects.addMedicine.error.time = 'Ogiltigt tid för när medicinen ska börja tas'
      } else {
        this.dialogsObjects.addMedicine.error.time = ''
      }
    },
    'dialogsObjects.addMedicine.interval.hours' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.hours = this.validInt(newAmount, `'${newAmount}' är ett ogiltigt nummer`)
      if (newAmount === '0' && this.dialogsObjects.addMedicine.interval.days === '0') {
        this.dialogsObjects.addMedicine.error.bothIsZero = 'Medicinen kan ej tas på sådant kort intervall'
      } else {
        this.dialogsObjects.addMedicine.error.bothIsZero = ''
      }
    },
    'dialogsObjects.addMedicine.interval.days' (newAmount, oldAmount) {
      this.dialogsObjects.addMedicine.error.days = this.validInt(newAmount, `'${newAmount}' är ett ogiltigt nummer`)
      if (newAmount === '0' && this.dialogsObjects.addMedicine.interval.hours === '0') {
        this.dialogsObjects.addMedicine.error.bothIsZero = 'Medicinen kan ej tas på sådant kort intervall'
      } else {
        this.dialogsObjects.addMedicine.error.bothIsZero = ''
      }
    },
    'dialogsObjects.addMedicine.remind' (newDate, oldDate) {
      if (newDate === '') {
        this.dialogsObjects.addMedicine.error.remind = 'Ogiltigt tidsintervall för påminnelse'
      } else {
        this.dialogsObjects.addMedicine.error.remind = ''
      }
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
      // const idToken = this.$store.state.user.idToken
      if (this.person) {
        const personObject = { index: this.$store.state.user.people.length, name: this.dialogsObjects.addPerson.name, id: this.dialogsObjects.addPerson.id }
        this.$store.dispatch('user/addPerson', personObject)
      } else {
        const medicineObject = {
          personPointer: this.personPointer,
          index: this.$store.state.user.people[this.personPointer].medications.length,
          name: this.dialogsObjects.addMedicine.name,
          amount: this.dialogsObjects.addMedicine.amount,
          startTime: Date.parse(this.dialogsObjects.addMedicine.date + ' ' + this.dialogsObjects.addMedicine.time),
          interval: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.interval.days + 1000 * 60 * 60 * this.dialogsObjects.addMedicine.interval.hours,
          remind: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.remind,
          personId: this.$store.state.user.people[this.personPointer].id,
          personName: this.$store.state.user.people[this.personPointer].name
        }
        this.$store.dispatch('user/addMedicine', medicineObject)
      }
    }
  },
  components: {
    List
  }
}

</script>
