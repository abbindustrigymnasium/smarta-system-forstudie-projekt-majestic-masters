<template>
  <div class="q-pa-sm">
    <q-list class="q-gutter-sm">
      <q-item native.prevent v-for="(searchResult, index) in list" :key="`q-item-${index}`" class="bg-light2 q-pa-sm q-pb-none" clickable v-ripple @click.native.prevent="goTo(searchResult, searchResult.hasOwnProperty('id'))">
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

        <div right class="q-pr-xs q-gutter-sm row">
          <q-item-section v-if="searchResult.hasOwnProperty('id')" class="column">
            <q-badge text-color="white" color="red" v-if="lookForForgotAmount(searchResult.medications)" class="col">
              {{ lookForForgotAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>
            <q-badge text-color="transparent" color="transparent" v-else class="col">
              {{ lookForForgotAmount(searchResult.medications) }} <q-icon name=" " class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

            <q-badge text-color="black" color="yellow-6" v-if="lookForRunningOutAmount(searchResult.medications)" class="col">
              {{ lookForRunningOutAmount(searchResult.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>
            <q-badge text-color="transparent" color="transparent" v-else class="col">
              {{ lookForRunningOutAmount(searchResult.medications) }} <q-icon name=" " class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

          </q-item-section>

          <q-item-section v-else class="column">
            <q-badge text-color="white" color="red" v-if="searchResult.hasForgot" class="col">
              <q-icon name="warning" class="q-ml-xs q-mr-xs" size="14px"></q-icon>
            </q-badge>
            <q-badge text-color="transparent" color="transparent" v-else class="col">
              <q-icon name=" " class="q-ml-xs q-mr-xs" size="14px"></q-icon>
            </q-badge>
            <q-badge text-color="black" color="yellow-6" v-if="searchResult.remind >= searchResult.amount * searchResult.interval" class="col">
              <q-icon name="warning" class="q-ml-xs q-mr-xs" size="14px"></q-icon>
            </q-badge>
            <q-badge text-color="transparent" color="transparent" v-else class="col">
              <q-icon name=" " class="q-ml-xs q-mr-xs" size="14px"></q-icon>
            </q-badge>
          </q-item-section>

          <q-btn v-if="showDelete === 'person'" @click.capture.stop="deleteItem(searchResult)" icon="delete_outline" class="text-white bg-primary1" round/>
          <q-btn v-else-if="showDelete === 'medicine'" @click.capture.stop="deleteItem(searchResult)" icon="delete_outline" class="text-white bg-primary1" round/>

        </div>
      </q-item>

    </q-list>

    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar v-if="$q.platform.is.desktop" icon="delete_forever" color="primary1" text-color="white"/>
          <span v-if="showDelete === 'person'" class="q-ml-sm">Vill du ta bort personen {{ item.name }}?</span>
          <span v-else-if="showDelete === 'medicine'" class="q-ml-sm">Vill du ta bort medicinen {{ item.name }}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nej" color="primary2" v-close-popup/>
          <q-btn flat label="Ja" v-if="showDelete === 'person'" @click="$store.dispatch('user/deletePerson', { index: item.index, id: item.id })" color="negative" v-close-popup/>
          <q-btn flat label="Ja" v-else-if="showDelete === 'medicine'" @click="$store.dispatch('user/deleteMedicine', { id: item.id, index: item.index })" color="negative" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'Dialog-Layout',
  props: ['list', 'personPointer', 'people', 'showDelete'],
  data () {
    return {
      confirm: false,
      item: { index: null, id: null, name: null }
    }
  },
  methods: {
    deleteItem (item) {
      if (this.showDelete === 'person') {
        this.item.index = item.index
        this.item.id = item.id
        this.item.name = item.name
        this.confirm = true
      } else if (this.showDelete === 'medicine') {
        this.item.index = item.index
        this.item.id = item.medicine_id
        this.item.name = item.name
        this.confirm = true
      }
    },
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
