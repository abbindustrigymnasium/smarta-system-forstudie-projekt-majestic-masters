<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <div v-for="(person, index) in personer" :key="index" class="row q-pb-md">
            <q-btn size="lg" class="full-width" color="positive" :label="person.namn" @click="goToPerson(index)"></q-btn>
          </div>
        </div>
        <!-- <span>
          <q-btn color="primary" icon="add"></q-btn>
        </span> -->
        <!-- class="text-center q-pa-none q-pt-md" style="border-radius: 5px;" -->
        <div class="items-center">
          <p class="text-center text-dark text-subtitle1" v-if="!this.personer.length"> <!-- !Object.keys(this.personer).length -->
            Ser tomt ut<br>Testa lägga till någon
          </p>
        </div>

        <div class="row q-pa-md fixed-bottom q-mb-xl">
          <q-btn size="lg" class="full-width" color="primary" icon="add" @click="addPerson(makeID(10))"></q-btn>
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
      personer: [

      ]
    }
  },
  mounted () {
    this.$store.commit('user/updateUrl', 1)
    this.personer = this.$store.state.user.people
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
    addPerson: function (id) {
      var element = {
        namn: id,
        mediciner: [

        ]
      }
      element.id = id
      this.personer.push(element) // om du ändrar personer här kommer du ändra i store? för detta är en pointer???
      this.$store.commit('user/updatePeople', this.personer)
      // this.personer = this.$store.state.user.people
    },
    goToPerson: function (personPointer) {
      this.$store.commit('user/updatePersonPointer', personPointer)
      this.$router.push('/People/Person')
    }
  }
}
</script>
