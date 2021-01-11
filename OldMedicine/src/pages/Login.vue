<template>
  <q-layout>
    <q-page-container>
      <q-page class='window-height window-width row justify-center items-center bg-light1'>
        <div class='column q-pa-lg' v-if="loggingIn">
          <div class='row'>
            <q-card square class='shadow-5' style='width: 300px height: 485px'>
              <q-card-section class='bg-primary1'>
                <h4 class='text-h5 text-white q-my-md'>Inloggning</h4>
              </q-card-section>
              <p v-if="failedLogin" class="text-negative q-mt-md q-mb-none q-ml-md">Email och lösenord matchar inte</p>
              <p v-else class="text-transparent q-mt-md q-mb-none q-ml-md">.</p>
              <q-card-section class="bg-light2 q-pt-none">
                <q-form class='q-px-sm'>
                  <q-input color="primary2" square v-model='login_email' type='email' label='Email'>
                    <template v-slot:prepend>
                      <q-icon name='email' color="primary2"/>
                    </template>
                  </q-input>
                  <q-input color="primary2" square v-model='login_password' type='password' label='Lösenord'>
                    <template v-slot:prepend>
                      <q-icon name='lock' color="primary2"/>
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class='q-px-lg'>
                <q-btn unelevated size='lg' color='secondary1' class='full-width text-white' label='Logga in' v-on:click="login()"/>
              </q-card-actions>
              <q-card-actions class='q-px-lg q-pb-md'>
                <q-btn no-caps unelevated size='md' color='light2' class='full-width text-grey' label='Inget konto? Skapa ett!' v-on:click="showCard(false)"/>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div class='column q-pa-lg' v-else>
          <div class='row'>
            <q-card square class='shadow-5' style='width: 300px height: 485px '>
              <q-card-section class='bg-primary1'>
                <h4 class='text-h5 text-white q-my-md'>Registrering</h4>
              </q-card-section>
              <p v-if="failedRegister" class="text-negative q-mt-md q-mb-none q-ml-md">Registrering misslyckades</p>
              <p v-else-if="failedRegisterPassword" class="text-negative q-mt-md q-mb-none q-ml-md">Lösenorden matchar inte</p>
              <b v-else-if="registerSuccess" class="text-positive q-mt-md q-mb-none q-ml-md">Registrering lyckades</b>
              <p v-else class="text-transparent q-mt-md q-mb-none q-ml-md">.</p>
              <q-card-section class="bg-light2 q-pt-none">
                <q-form class='q-px-sm'>
                  <q-input color="primary2" square v-model='registration_email' type='email' label='Email' id='registration-email-input'>
                    <template v-slot:prepend>
                      <q-icon name='email' color="primary2"/>
                    </template>
                  </q-input>
                  <q-input color="primary2" square v-model='registration_password' type='password' label='Lösenord' id='registration-password-input'>
                    <template v-slot:prepend>
                      <q-icon name='lock' color="primary2"/>
                    </template>
                  </q-input>
                  <q-input color="primary2" square v-model='registration_password_confirm' type='password' label='Bekräfta lösenord' id='registration-password-confirm-input'>
                    <template v-slot:prepend>
                      <q-icon name='lock' color="primary2"/>
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class='q-px-lg'>
                <q-btn unelevated size='lg' color='secondary1' class='full-width text-white' label='Registrera dig' v-on:click="register()"/>
              </q-card-actions>
              <q-card-actions class='q-px-lg q-pb-md'>
                <q-btn no-caps unelevated size='md' color='light2' class='full-width text-grey' label='Tillbaka till login' v-on:click="showCard(true)"/>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>

const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  name: 'Init',
  mounted () {
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
        var clientId = session.getIdToken().payload.['cognito:username']
        var idToken = session.getIdToken().getJwtToken()
        self.changeIdToken(idToken)
        self.changeClientId(clientId)

        self.$router.push('/')
        this.$store.dispatch('user/getInit', this.$store.state.user.idToken)
      })
    }
  },
  methods: {
    showCard (bool) {
      this.loggingIn = bool
    },
    changeIdToken (idToken) {
      this.$store.commit('user/updateIdToken', idToken)
    },
    changeClientId (clientId) {
      this.$store.commit('user/changeClientId', clientId)
    },
    login () {
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
          idToken = result.getIdToken().getJwtToken()
          var clientId = result.getIdToken().payload.['cognito:username']
          self.changeIdToken(idToken)
          self.changeClientId(clientId)

          localStorage.setItem('refresh', result.getRefreshToken().token)
          localStorage.setItem('email', self.login_email)

          self.$router.push('/')
          this.$store.dispatch('user/getInit', this.$store.state.user.idToken)
        },
        onFailure: function (err) {
          console.log(err)
          self.failedLogin = true
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
    register () {
      const self = this
      if (this.registration_password === this.registration_password_confirm) {
        const poolData = {
          UserPoolId: 'eu-north-1_xGf5vCkUT',
          ClientId: '5c2d3lhicpqjk1ujlh8k5o8jeg'
        }

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
        var attributeList = []
        var dataEmail = {
          Name: 'email',
          Value: this.registration_email
        }
        var dataPersonalName = {
          Name: 'name',
          Value: 'test'
        }

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
        var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName)
        attributeList.push(attributeEmail)
        attributeList.push(attributePersonalName)

        userPool.signUp(this.registration_email, this.registration_password, attributeList, null, function (err, result) {
          if (err) {
            self.failedRegister = true
            return
          }
          console.log(result)
          self.registerSuccess = true
          document.getElementById('registration-email-input').value = ''
        })
      } else {
        this.failedRegisterPassword = true
      }
    }
  },
  data () {
    return {
      loggingIn: true,
      login_email: '',
      login_password: '',
      registration_email: '',
      registration_password: '',
      registration_password_confirm: '',
      failedLogin: false,
      failedRegister: false,
      failedRegisterPassword: false,
      registerSuccess: false
    }
  },
  watch: {
    login_email (newEmail) {
      if (newEmail === '') {
        this.failedLogin = false
      }
    }
  }
}
</script>
