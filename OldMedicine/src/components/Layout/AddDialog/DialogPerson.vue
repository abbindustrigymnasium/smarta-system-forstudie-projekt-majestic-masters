<template>
  <div id="Dialog-Person">
    <q-input outlined v-model="name" label="Skriv in namnet på den du önskas lägga till">
    </q-input>
    <q-input outlined v-model="id" label="Skriv in enhetens ID">
    </q-input>

    <p class="text-red" v-if="name===''">Namn fältet får ej vara tomt!</p>
    <p class="text-red" v-if="invalidID && !invalidName">Felaktigt ID</p>

    <q-btn v-close-popup>Avbryt</q-btn>
    <q-btn v-close-popup="buttonPress" @click="addPerson()" :disabled="invalidName || invalidID">Lägg till person</q-btn>
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
    },
    addPerson () {
      this.buttonPress = true
      this.$store.commit('user/addPerson', { name: this.name, id: this.id })
    }
  }
}

</script>
