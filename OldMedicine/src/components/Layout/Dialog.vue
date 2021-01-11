<template>
  <q-card style="height: 60vh; width: 85vh" id="Dialog-Layout">
    <q-card-section class="q-pb-none">
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1" v-if="!medicine && !person">
        <p v-if="personPointer === null">
          Sök efter personer och mediciner
        </p>
        <p v-else>
          Sök efter mediciner som {{ people[personPointer].name }} tar
        </p>
      </q-item>
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1" v-if="person">
        <p>
          Lägg till en person
        </p>
      </q-item>
      <q-item class="justify-center q-pb-none text-primary2 text-subtitle1" v-else-if="medicine">
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
      <q-input color="primary2" class="col" outlined v-model="dialogsObjects.addMedicine.name" label="Skriv in medicinens namn"/>
      <q-input color="primary2" class="col" type='number' outlined v-model="dialogsObjects.addMedicine.amount" label="Skriv in antalet tabletter"/>

      Hur ofta medicinen ska tas
      <q-item class="col">
        <q-input color="primary2" class="col" outlined type="date" v-model="dialogsObjects.addMedicine.date"/>
        <q-input color="primary2" class="col" outlined type="time" v-model="dialogsObjects.addMedicine.date"/>
      </q-item>
      När medicinen ska börja tas
      <q-item class="col">
        <q-input color="primary2" class="col" outlined type="date" v-model="dialogsObjects.addMedicine.date"/>
        <q-input color="primary2" class="col" outlined type="time" v-model="dialogsObjects.addMedicine.date"/>
      </q-item>
      <!-- Intervall
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.interval.days" label="Dagar"/>
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.interval.hours" label="Timmar"/>
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.interval.minutes" label="Minuter"/>

      Påminnelse innan medicinen tar slut
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.remind.days" label="Dagar"/>
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.remind.hours" label="Timmar"/>
      <q-input class="col" type='number' outlined v-model="dialogsObjects.addMedicine.remind.minutes" label="Minuter"/> -->
    </q-card-actions>

    <q-card-section v-if="!medicine && !person">
      <q-item-label>Söker bland {{ listAmount }} föremål</q-item-label>
      <q-item-label caption>Filtrerad sökning gav {{ dialogsObjects.search.list.length }} resultat</q-item-label>
    </q-card-section>

    <List @showNewDialog="showNewDialog($event)" :list="dialogsObjects.search.list" :personPointer="personPointer" :people="people"/>

    <q-card-section
      class="q-pt-none q-pl-none row"
      white-space:
      pre-line
      v-if="
        dialogsObjects.search.error.list !== '' ||
        dialogsObjects.addPerson.error.name !== '' ||
        dialogsObjects.addPerson.error.id !== '' ||
        dialogsObjects.addMedicine.error.name !== '' ||
        dialogsObjects.addMedicine.error.amount !== ''
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

      </q-list>

      <!-- <q-list v-for="(obj, index) in dialogsObjects" :key="`q-list-${index}`">
        <q-item v-for="(error, indexes) in obj.error" :key="`q-item-${indexes}`">
          <p v-if="error !== ''">
            {{ error }}
          </p>
        </q-item>
      </q-list> -->

      <q-card-actions align="right" class="col">
        <q-btn color="primary1" flat v-if="!medicine && !person && personPointer === null" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: true, addMedicineDialog: false }, key: dialogsObjects.search.key })">Ja</q-btn>
        <q-btn color="primary1" flat v-else-if="!medicine && !person" @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, key: dialogsObjects.search.key })">Ja</q-btn>
      </q-card-actions>

    </q-card-section>

    <q-card-actions align="right" v-if="medicine || person">
      <q-btn color="negative" flat @click="showNewDialog({ dialogBooleans: { searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, key: '' })">Avbryt</q-btn>
      <q-btn color="primary1" flat @click="createNew()" :disabled="dialogsObjects.addPerson.error.name !== '' || dialogsObjects.addPerson.error.id !== '' || dialogsObjects.addMedicine.error.name !== '' || dialogsObjects.addMedicine.error.interval !== '' || dialogsObjects.addMedicine.error.remind !== ''">Lägg till</q-btn>
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
    this.dialogsObjects.search.key = ''
  },
  watch: {
    'dialogsObjects.search.key' (newKey, oldKey) {
      this.dialogsObjects.search.list = []
      this.listAmount = 0
      if (this.personPointer === null) {
        for (var i = 0; i < this.list.length; i++) {
          for (var q = 0; q < this.list[i].medications.length; q++) {
            this.listAmount++
            if (this.list[i].medications[q].name.toLowerCase().includes(newKey) && newKey !== '') {
              this.dialogsObjects.search.list.push(this.list[i].medications[q])
            }
          }
          this.listAmount++
          if (this.list[i].name.toLowerCase().includes(newKey) && newKey !== '') {
            this.dialogsObjects.search.list.push(this.list[i])
          }
        }
      } else {
        for (var r = 0; r < this.list.medications.length; r++) {
          this.listAmount++
          if (this.list.medications[r].name.toLowerCase().includes(newKey) && newKey !== '') {
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
          interval: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.interval.days + 1000 * 60 * 60 * this.dialogsObjects.addMedicine.interval.hours + 1000 * 60 * this.dialogsObjects.addMedicine.interval.minutes,
          remind: 1000 * 60 * 60 * 24 * this.dialogsObjects.addMedicine.remind.days + 1000 * 60 * 60 * this.dialogsObjects.addMedicine.remind.hours + 1000 * 60 * this.dialogsObjects.addMedicine.remind.minutes,
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
