<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-btn @click="showLoading">login</q-btn>
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
    this.$store.dispatch('user/getInit')
  },
  methods: {
    showLoading () {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        spinnerSize: 130,
        backgroundColor: 'white',
        message: 'We are getting things ready for you. Hang on...',
        messageColor: 'secondary'
      })
      setTimeout(() => {
        Loading.hide()
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>
