<template>
  <div id="Buttons-Home">
    <q-btn @click="changeSearchDialog()">
      Hitta en person eller medicin
    </q-btn>

    <q-breadcrumbs-el label="Personer" icon="people" ></q-breadcrumbs-el>

    <q-btn :color="buttons.all" @click="changeAllSearch()">
      Alla
    </q-btn>

    <q-btn :color="buttons.forgot" @click="changeSearchForgotten()">
      Glömt tagit
      <q-badge text-color="white" color="red" v-if="amountOfPeopleForgot">
        {{ amountOfPeopleForgot }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

    <q-btn :color="buttons.runningOut" @click="changeSearchRunningOut()">
      Får snart slut på medicin
      <q-badge text-color="black" color="yellow-6" v-if="amountOfPeopleRunningOut">
        {{ amountOfPeopleRunningOut }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

    <q-btn class="bg-green" @click="changeAddDialog()">
      Lägg till någon
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Buttons-Home',
  props: ['buttons', 'people'],
  computed: {
    amountOfPeopleForgot: function () {
      return this.people.filter(person => (this.lookFor(person.medications, 'hasForgot'))).length
    },
    amountOfPeopleRunningOut: function () {
      return this.people.filter(person => (this.lookFor(person.medications, 'isRunningOut'))).length
    }
  },
  methods: {
    changeSearchDialog () {
      this.$emit('changeSearchDialog')
    },
    changeAllSearch () {
      this.$emit('changeAllSearch')
    },
    changeSearchForgotten () {
      this.$emit('changeSearchForgotten')
    },
    changeSearchRunningOut () {
      this.$emit('changeSearchRunningOut')
    },
    changeAddDialog () {
      this.$emit('changeAddDialog')
    },
    lookForAmount (meds, key) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          amount++
        }
      }
      return amount
    },
    lookFor (meds, key) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          return true
        }
      }
      return false
    }
  }
}
</script>
