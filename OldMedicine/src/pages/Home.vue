<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <People
        :people="people"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
      <div class="justify-center fixed-center text-center" style="width: 80%" v-if="people.length === 0">
        <q-item-label class="justify-center text-center row text-h5 text-weight-regular">Ser tomt ut</q-item-label>
        <q-item-label class="justify-center text-center row text-body1">Testa lägga till en någon genom att trycka på '+' knappen</q-item-label>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

import People from '../components/Home/People.vue'
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  name: 'Home',
  mounted () {
    this.$store.commit('user/changePersonPointer', null)
    this.$store.commit('user/changeMedicinePointer', null)
    const alreadyLoggedIn = localStorage.getItem('email') !== null
    if (!alreadyLoggedIn) {
      console.log('GOING TO LOGIN')
      this.$router.push('/Login')
    } else if (this.$store.state.user.clientId === '') {
      this.refresh()
    }
  },
  computed: {
    people () {
      return this.$store.state.user.people
    },
    filterForgotten () {
      return this.$store.state.user.filterForgotten
    },
    filterRunningOut () {
      return this.$store.state.user.filterRunningOut
    }
  },
  components: {
    People
  },
  methods: {
    refresh () {
      const self = this
      const email = localStorage.getItem('email')
      const refreshToken = localStorage.getItem('refresh')
      const poolData = {
        UserPoolId: 'eu-north-1_xGf5vCkUT',
        ClientId: '5c2d3lhicpqjk1ujlh8k5o8jeg'
      }
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
      var userData = {
        Username: email,
        Pool: userPool
      }
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      console.log(cognitoUser)
      var token = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken })
      cognitoUser.refreshSession(token, (err, session) => {
        if (err) {
          console.log(err)
        }
        console.log(session)
        var clientId = session.getIdToken().payload.['cognito:username']
        var idToken = session.getIdToken().getJwtToken()
        self.changeIdToken(idToken)
        self.changeClientId(clientId)

        console.log('IDTOKEN', idToken)

        this.$store.dispatch('user/getInit', this.$store.state.user.idToken)
      })
    },
    changeIdToken (idToken) {
      console.log('CHANGING TOKEN')
      this.$store.commit('user/updateIdToken', idToken)
    },
    changeClientId (clientId) {
      this.$store.commit('user/changeClientId', clientId)
    }
  }
}
</script>
