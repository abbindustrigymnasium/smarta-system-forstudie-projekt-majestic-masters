<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
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
    this.showLoading()
    setTimeout(() => {
      Loading.hide()
      this.$router.push('/People')
    }, 3000)
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
    }
  }
}
</script>
