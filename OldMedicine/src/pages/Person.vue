<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <div v-for="(medicin, index) in mediciner" :key="index" class="row q-pb-md">
            <q-btn size="lg" class="full-width" color="primary" :label="medicin" @click="goToDrug(medicin)"></q-btn>
          </div>
        </div>
        <!-- <span>
          <q-btn color="primary" icon="add"></q-btn>
        </span> -->
        <!-- class="text-center q-pa-none q-pt-md" style="border-radius: 5px;" -->
        <div class="items-center">
          <p class="text-center text-dark text-subtitle1" v-if="!this.mediciner.length"> <!-- !Object.keys(this.mediciner).length -->
            Här kan du lägga till mediciner
          </p>
        </div>

        <div class="row q-pa-md fixed-bottom q-mb-xl">
          <q-btn size="lg" class="full-width" color="primary" icon="add" @click="addDrugs(makeID(10))"></q-btn>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      person: null,
      mediciner: [

      ]
    }
  },
  mounted () {
    this.person = this.$store.state.user.person
    if (this.person === null) {
      this.$router.push('/People')
    }
    this.$store.commit('user/updateUrl', 2)
  },
  methods: {
    makeID: function (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    addDrugs: function (id) {
      this.mediciner.push(id)
    },
    goToDrug: function (Drug) {
      this.$store.commit('user/updateMedicine', Drug)
      this.$router.push('/People/Person/Medicine')
    }
  }
}
</script>
