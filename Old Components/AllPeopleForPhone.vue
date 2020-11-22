<template>
  <q-page>
    <!-- <script src="../utils/functions.js"/> -->
    <div class="q-pa-md">
      <div v-for="(person, index) in people" :key="index" class="row q-pb-md">
        <q-btn size="lg" class="full-width" color="positive" :label="person.name" @click="goToPerson(index)"></q-btn>
      </div>
    </div>

    <div class="items-center">
      <p class="text-center text-dark text-subtitle1" v-if="!people.length"> <!-- !Object.keys(this.personer).length -->
        Ser tomt ut<br>Testa lägga till någon
      </p>
    </div>

    <div class="row q-pa-md fixed-bottom q-mb-xl">
      <q-btn size="lg" class="full-width" color="primary" icon="add" @click="addPerson(makeID(10))"></q-btn>
    </div>
  </q-page>
</template>

<script>

// import { makeID, addPerson, goToPerson } from '../utils/functions.js'

export default {
  name: 'AllPeopleForPhone',
  props: ['people']
  // methods: {
  //   makeID,
  //   addPerson,
  //   goToPerson
  // }
  // methods: {
  //   makeID: function (length) {
  //     makeID(length)
  //   },
  //   addPerson: function (id) {
  //     addPerson(id)
  //   },
  //   goToPerson: function (personPointer) {
  //     goToPerson(personPointer)
  //   }
  // }
}
</script>
