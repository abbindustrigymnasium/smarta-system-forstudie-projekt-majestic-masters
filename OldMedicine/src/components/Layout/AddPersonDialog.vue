<template>
  <div id="Dialog-Layout">
    <q-card>
      <q-input outlined v-model="name" label="Skriv in namnet på den du önskas lägga till">
      </q-input>
      <q-input outlined v-model="id" label="Skriv in enhetens ID">
      </q-input>

      <p class="text-red" v-if="name===''">Namn fältet får ej vara tomt!</p>
      <p class="text-red" v-if="invalidID && !invalidName">Felaktigt ID</p>

      <q-btn v-close-popup>Avbryt</q-btn>
      <q-btn v-close-popup="buttonPress" @click="addPerson" :disabled="invalidName || invalidID">Lägg till person</q-btn>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'Dialog-Layout-Add-Person',
  props: ['people'],
  data () {
    return {
      name: '',
      id: '',
      invalidName: true,
      invalidID: true,
      buttonPress: false
    }
  },
  watch: {
    name: function (newName, oldName) {
      this.validOptions()
    },
    id: function (newID, oldID) {
      this.validOptions()
    }
  },
  methods: {
    addPerson () {
      this.buttonPress = true
      var element = {
        name: this.name,
        medications: [
          {
            name: 'weed',
            hasForgot: 1,
            isRunningOut: 1
          }
        ]
      }
      element.id = this.id
      this.$store.commit('user/addPerson', element)
    },
    validOptions () {
      if (this.name === '') {
        this.invalidName = true
      } else {
        this.invalidName = false
      }
      if (this.id === '') {
        this.invalidID = true
      } else {
        this.invalidID = false
      }
      for (var i = 0; i < this.people.length; i++) {
        if (this.id === this.people[i].id) {
          this.invalidID = true
          break
        }
      }
    }
  }
}
</script>
