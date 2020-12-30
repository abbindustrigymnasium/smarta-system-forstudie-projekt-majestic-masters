<template>
  <div>
    <template v-for="(searchResult, index) in list">
      <q-separator :key="`q-sep-${index}`"></q-separator>

      <q-item :key="`q-item-${index}`" clickable v-ripple @click="goTo(searchResult, searchResult.hasOwnProperty('id'))">

        <q-icon v-if="searchResult.hasOwnProperty('id')" name="person" class="text-primary"/>
        <q-icon v-else name="medical_services" class="text-secondary"/>

        <q-item-section>
          <span v-if="!searchResult.hasOwnProperty('id') && personPointer === null">
            {{ people[searchResult.personPointer].name }}/{{ searchResult.name }}
          </span>
          <div v-else>
            {{ searchResult.name }}
          </div>
        </q-item-section>

        <div v-if="searchResult.hasOwnProperty('id')">
          <q-badge text-color="white" color="red" v-if="lookForForgotAmount(searchResult.medications)">
            {{ lookForForgotAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="lookForRunningOutAmount(searchResult.medications)">
            {{ lookForRunningOutAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </div>

        <div v-else>
          <q-badge text-color="white" color="red" v-if="searchResult.hasForgot">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="searchResult.remind >= searchResult.amount * searchResult.interval">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </div>

      </q-item>

      <div :key="`q-div-${index}`" v-if="showDelete">
        <q-btn-dropdown color="primary" icon="more_vert" dropdown-icon=" ">
          <q-list v-if="showDelete == 'medicine'">
            <q-item clickable v-close-popup @click="$store.dispatch('user/deleteMedicine', { id: searchResult.medicine_id, index: searchResult.index })">
              <q-item-section>
                <q-item-label >Ta bort medicin</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="showNewDialog({ searchDialog: false, addPersonDialog: false, addMedicineDialog: true }, '')">
              <!-- $store.commit('user/changeMedicine', { id, amount, interval, startTime, medicineName }) -->
              <q-item-section>
                <q-item-label>Ändra medicin</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-list v-else-if="showDelete == 'person'">
            <q-item clickable v-close-popup @click="$store.dispatch('user/deletePerson', { clientId: this.$store.state.user.clientId, index: searchResult.index, id: searchResult.id })">
              <q-item-section>
                <q-item-label >Ta bort person</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="$store.commit('user/changePerson', searchResult.index)">
              <q-item-section>
                <q-item-label>Ändra person</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

    </template>
  </div>
</template>

<script>
export default {
  name: 'Dialog-Layout',
  props: ['list', 'personPointer', 'people', 'showDelete'],
  methods: {
    lookForForgotAmount (meds) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].hasForgot) {
          amount++
        }
      }
      return amount
    },
    lookForRunningOutAmount (meds) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].remind >= meds[i].amount * meds[i].interval) {
          amount++
        }
      }
      return amount
    },
    lookForRunningOut (meds) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i].remind >= meds[i].amount * meds[i].interval) {
          return true
        }
      }
      return false
    },
    showNewDialog (dialogBooleans, key) {
      this.$emit('showNewDialog', { dialogBooleans: dialogBooleans, key: key })
    },
    goTo (subject, isPerson) {
      this.showNewDialog({ searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, '')
      if (isPerson) {
        this.$store.commit('user/changePersonPointer', subject.index)
        this.$router.push('/Person')
      } else {
        this.$store.commit('user/changePersonPointer', subject.personPointer)
        this.$store.commit('user/changeMedicinePointer', subject.index)
        this.$router.push('/Person/Medicine')
      }
    }
  }
}
</script>
