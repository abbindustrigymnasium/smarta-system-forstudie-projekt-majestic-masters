<template>
  <div id="Header-Layout">
    <q-header elevated class="bg-primary">
      <q-btn @click="changeSearchDialog()">
        Hitta en person eller medicin
      </q-btn>

      <q-breadcrumbs-el label="Personer" icon="people" ></q-breadcrumbs-el>

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
        Får snart slut på medicin
        <q-badge text-color="black" color="yellow-6" v-if="amountRunningOut">
          {{ amountRunningOut }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
        </q-badge>
      </q-btn>

      <q-btn class="bg-green" @click="changeAddPersonDialog()">
        Lägg till någon
      </q-btn>

    </q-header>
  </div>
</template>

<script>

export default {
  name: 'Header-Layout',
  props: ['people', 'personPointer', 'medicinePointer'],
  data () {
    return {
      buttons: {
        all: 'blue-6',
        forgot: 'primary',
        runningOut: 'primary'
      }
    }
  },
  computed: {
    amountForgot: function () {
      return this.people.filter(person => person.hasForgot).length
    },
    amountRunningOut: function () {
      return this.people.filter(person => person.isRunningOut).length
    },
    filterForgotten: function () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut: function () {
      return this.$store.state.user.filterRunningOut
    }
  },
  watch: {
    filterForgotten: function (oldValue, newValue) {
      if (newValue) {
        this.buttons.forgot = 'priamry'
      } else {
        this.buttons.forgot = 'blue-6'
      }
      this.changeButtonAllState()
    },
    filterRunningOut: function (oldValue, newValue) {
      if (newValue) {
        this.buttons.runningOut = 'primary'
      } else {
        this.buttons.runningOut = 'blue-6'
      }
      this.changeButtonAllState()
    }
  },
  methods: {
    changeSearchDialog () {
      this.$emit('changeSearchDialog')
    },
    changeSearchForgotten () {
      this.$store.commit('user/updateFilterForgotten', !this.$store.state.user.filterForgotten)
    },
    changeSearchRunningOut () {
      this.$store.commit('user/updateFilterRunningOut', !this.$store.state.user.filterRunningOut)
    },
    changeAllSearch () {
      this.$store.commit('user/updateFilterForgotten', false)
      this.$store.commit('user/updateFilterRunningOut', false)
    },
    changeButtonAllState () {
      if (!this.filterForgotten && !this.filterRunningOut) {
        this.buttons.all = 'blue-6'
      } else {
        this.buttons.all = 'primary'
      }
    },
    changeAddPersonDialog () {
      this.$emit('changeAddPersonDialog')
    }
  }
}
</script>
