<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <People
        :people="people"
        :filterForgotten="filterForgotten"
        :filterRunningOut="filterRunningOut"
      />
    </q-page-container>
  </q-layout>
</template>

<script>

import People from '../components/Home/People.vue'
import axios from 'axios'

export default {
  name: 'Home',
  mounted () {
    this.$store.commit('user/changePersonPointer', null)
    this.$store.commit('user/changeMedicinePointer', null)
    this.request('/medicine/patch', { medicine_id: '120912132', amount: 666, interval: 111 }, 'patch')
  },
  methods: {
    request (endpoint, body, method) { // Exempel: ('connections/get', {'client_id': CLIENT_ID_HERE}, 'get'}
      if (method === 'get') {
        var queryParameters = '?'
        for (const key in body) {
          queryParameters += key + '=' + body[key] + '&'
        }
        queryParameters = queryParameters.slice(0, -1)

        axios.get(this.baseURL + endpoint + queryParameters).then(response => {
          return response.data.body
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        axios({
          method: method,
          url: this.baseURL + endpoint,
          headers: {},
          data: body
        }).then(response => {
          console.log(response)
          return response.data.body
        }).catch(function (error) {
          console.log(error)
        })
      }
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
    },
    baseURL () {
      return 'https://pxe6lsvbkl.execute-api.eu-north-1.amazonaws.com/default'
    }
  },
  components: {
    People
  }
}
</script>
