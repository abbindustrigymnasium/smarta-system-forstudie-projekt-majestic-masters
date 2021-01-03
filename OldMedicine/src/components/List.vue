<template>
  <div class="q-pa-sm">
    <q-list class="q-gutter-sm">
      <q-item v-for="(searchResult, index) in list" :key="`q-item-${index}`" class="bg-light2 q-pa-sm q-pb-none" clickable v-ripple @click="goTo(searchResult, searchResult.hasOwnProperty('id'))">
        <q-item-section avatar>
          <q-icon v-if="searchResult.hasOwnProperty('id')" name="person" class="text-primary2" size="lg"/>
          <q-icon v-else name="medical_services" class="text-primary2" size="lg"/>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="!searchResult.hasOwnProperty('id')">{{ searchResult.name }}</q-item-label>
          <q-item-label v-else>{{ searchResult.name }}</q-item-label>
          <q-item-label caption v-if="!searchResult.hasOwnProperty('id')">{{ people[searchResult.personPointer].name }}</q-item-label>
          <q-item-label caption v-else>{{ searchResult.id }}</q-item-label>
        </q-item-section>

        <q-item-section :key="`q-div-${index}`" v-if="showDelete" style="max-width: 100px">
          <q-btn-dropdown color="primary2" icon="more_vert" dropdown-icon=" ">
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
              <q-item clickable v-close-popup @click="$store.dispatch('user/deletePerson', { index: searchResult.index, id: searchResult.id })">
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
        </q-item-section>

        <q-item-section v-if="searchResult.hasOwnProperty('id') && showDelete" class="column" style="max-width: 20px">
          <q-badge text-color="white" color="red" v-if="lookForForgotAmount(searchResult.medications)" class="col">
            {{ lookForForgotAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="lookForRunningOutAmount(searchResult.medications)" class="col">
            {{ lookForRunningOutAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </q-item-section>

        <q-item-section v-else-if="showDelete" class="column" style="max-width: 20px">
          <q-badge text-color="white" color="red" v-if="searchResult.hasForgot" class="col">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="searchResult.remind >= searchResult.amount * searchResult.interval" class="col">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </q-item-section>

      </q-item>

    </q-list>
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
