<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <h4 class="q-pl-md text-primary1">Logga in</h4>
      <q-card square flat class="bg-light1">
        <q-card-section class="q-gutter-sm">
          <q-form>
            <q-input filled square color="bg-primary2" label-color="text-primary2" style="font-size: 18px" v-model="email" type="email" label="Email"/>
            <q-input filled square color="bg-primary2" label-color="text-primary2" style="font-size: 18px" v-model="password" type="password" label="Lösen"/>
          </q-form>
        </q-card-section>
        <q-card-section v-if="loginError" class="q-pl-md q-pa-none">
          <p class="text-secondary2" style="font-weight: 300">Misslyckades att logga in dig.<br/>Vänligen försök igen.</p>
        </q-card-section>
      </q-card>
      <div>
        <q-btn text-color="text-secondary2" label="Logga in" style="font-weight: 300; font-size: 1rem" flat no-caps @click="showLoading"/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

import {
  Loading,
  QSpinnerFacebook
} from 'quasar'

export default {
  name: 'Init',
  mounted () {
    this.$store.commit('user/changeClientId', '67890')
    this.$store.dispatch('user/getInit')
  },
  methods: {
    showLoading () {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary1',
        spinnerSize: 130,
        backgroundColor: 'white',
        message: 'Vänligen vänta medan vi fixar saker åt dig...',
        messageColor: 'secondary1'
      })
      setTimeout(() => {
        Loading.hide()
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>
