<template>
  <q-layout>
  <q-page-container>
  <q-page
    class='window-height window-width row justify-center items-center'
    style='background: linear-gradient(#8274C5, #5A4A9F) '>
    <div class='column q-pa-lg'>
      <div class='row'>
        <q-card square class='shadow-24' style='width:300px height:485px '>
          <q-card-section class='bg-deep-purple-7'>
            <h4 class='text-h5 text-white q-my-md'>Inloggning</h4>
            <div class='absolute-bottom-right q-pr-md' style='transform: translateY(50%) '>
              <q-btn fab icon='add' color='purple-4' />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class='q-px-sm q-pt-xl'>
              <q-input square clearable v-model='login_email' type='email' label='Email'>
                <template v-slot:prepend>
                  <q-icon name='email' />
                </template>
              </q-input>
              <q-input square clearable v-model='login_password' type='password' label='Lösenord'>
                <template v-slot:prepend>
                  <q-icon name='lock' />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class='q-px-lg'>
            <q-btn unelevated size='lg' color='purple-4' class='full-width text-white' label='Logga in' v-on:click="login()"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class='column q-pa-lg'>
      <div class='row'>
        <q-card square class='shadow-24' style='width:300px height:485px '>
          <q-card-section class='bg-deep-purple-7'>
            <h4 class='text-h5 text-white q-my-md'>Registrering</h4>
            <div class='absolute-bottom-right q-pr-md' style='transform: translateY(50%) '>
              <q-btn fab icon='add' color='purple-4' />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class='q-px-sm q-pt-xl'>
              <q-input square clearable v-model='registration_email' type='email' label='Email'>
                <template v-slot:prepend>
                  <q-icon name='email' />
                </template>
              </q-input>
              <q-input square clearable v-model='registration_password' type='password' label='Lösenord'>
                <template v-slot:prepend>
                  <q-icon name='lock' />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class='q-px-lg'>
            <q-btn unelevated size='lg' color='purple-4' class='full-width text-white' label='Registrera dig' />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
  </q-page-container>
  </q-layout>
</template>
<script>

import {
  Loading,
  QSpinnerFacebook
} from 'quasar'

const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const AWS = require('aws-sdk')

export default {
  name: 'Init',
  mounted () {
    this.registration()
    const self = this
    const refreshToken = localStorage.getItem('refresh')
    const email = localStorage.getItem('email')

    if (refreshToken !== undefined && email !== undefined) {
      console.log('ALREADY LOGGED IN')
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
        var idToken = session.getIdToken().getJwtToken()
        self.changeIdToken(idToken)

        self.$router.push('/')
      })
    }
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
    },
    changeIdToken (idToken) {
      console.log('HALÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅ', idToken)
      Loading.hide()
      this.$store.commit('user/updateIdToken', idToken)
    },
    login () {
      console.log(this.login_email, this.login_password)

      const self = this

      const poolData = {
        UserPoolId: 'eu-north-1_xGf5vCkUT',
        ClientId: '5c2d3lhicpqjk1ujlh8k5o8jeg'
      }

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: this.login_email,
        Password: this.login_password
      })

      var userData = {
        Username: this.login_email,
        Pool: userPool
      }
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

      var idToken = ''

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log(result)
          console.log('LOGGED IN')
          idToken = result.getIdToken().getJwtToken()
          self.changeIdToken(idToken)

          localStorage.setItem('refresh', result.getRefreshToken().token)
          localStorage.setItem('email', self.login_email)
        },
        onFailure: function (err) {
          console.log(err)
        },
        newPasswordRequired: function (userAttributes) {
          delete userAttributes.email_verified
          delete userAttributes.phone_number_verified
          cognitoUser.completeNewPasswordChallenge('123456', userAttributes, {
            onFailure: function (err) {
              console.log(err)
            },
            onSuccess: function (result) {
              console.log(result)
            }
          })
        }
      })
    },
    registration () {
      var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
      cognitoidentityserviceprovider.signUp({
        ClientId: '5c2d3lhicpqjk1ujlh8k5o8jeg',
        Username: 'erik.spector@abbindustrigymnasium.se',
        Password: '123456',
        UserAttributes: [
          {
            Name: 'email',
            Value: 'aaa'
          }
        ]
      })
    }
  },
  data () {
    return {
      login_email: '',
      login_password: '',
      registration_email: '',
      registration_password: ''
    }
  }
}
</script>
