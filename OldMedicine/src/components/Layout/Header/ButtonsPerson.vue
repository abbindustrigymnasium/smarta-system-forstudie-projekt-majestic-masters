<template>
  <div id="Buttons-Person">
    <q-breadcrumbs-el :label="person.name" icon="person" ></q-breadcrumbs-el>

    <q-btn :color="buttons.all" @click="changeAllSearch()">
      Alla
    </q-btn>

    <q-btn :color="buttons.forgot" @click="changeSearchForgotten()">
      Glömt tagit
      <q-badge text-color="white" color="red" v-if="amountForgot">
        {{ amountForgot }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

    <q-btn :color="buttons.runningOut" @click="changeSearchRunningOut()">
      Snart slut
      <q-badge text-color="black" color="yellow-6" v-if="amountRunningOut">
        {{ amountRunningOut }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
      </q-badge>
    </q-btn>

    <q-btn class="bg-green" @click="changeAddDialog()">
      Lägg till en medicin
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Buttons-Person',
  props: ['person', 'buttons'],
  computed: {
    amountForgot: function () {
      return this.person.medications.filter(med => (med.hasForgot)).length
    },
    amountRunningOut: function () {
      return this.person.medications.filter(med => (med.isRunningOut)).length
    }
  },
  methods: {
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
    }
  }
}
</script>
