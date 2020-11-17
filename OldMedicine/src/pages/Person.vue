<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <div v-for="(medicin, index) in personer[personPointer].mediciner" :key="index" class="row q-pb-md">
            <p>{{ medicin }} {{ index }}</p>
            <q-btn size="lg" class="full-width" color="primary" :label="medicin.namn" @click="goToDrug(index)"></q-btn>
          </div>
        </div>
        <!-- <span>
          <q-btn color="primary" icon="add"></q-btn>
        </span> -->
        <!-- class="text-center q-pa-none q-pt-md" style="border-radius: 5px;" -->
        <div class="items-center">
          <p class="text-center text-dark text-subtitle1" v-if="!this.personer[this.personPointer].mediciner.length"> <!-- !Object.keys(this.mediciner).length -->
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
      personer: null,
      personPointer: null
    }
  },
  mounted () {
    this.personer = this.$store.state.user.people
    this.personPointer = this.$store.state.user.personPointer
    // console.log(this.personer[this.personPointer])
    if (this.personPointer === null) {
      this.$router.push('/People')
    } else {
      this.$store.commit('user/updateUrl', 2)
    }
    // console.log(this.personer)
    // console.log(this.personPointer)
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
      var element = {
        namn: id,
        antal: Math.floor(Math.random() * 100),
        beskrivning: 'lamao'
      }
      element.id = id
      this.personer[this.personPointer].mediciner.push(element)
      this.$store.commit('user/updatePeople', this.personer)
    },
    goToDrug: function (drugPointer) {
      this.$store.commit('user/updateMedicinePointer', drugPointer)
      this.$router.push('/People/Person/Medicine')
    }
  }
}
</script>
