<template>
  <div>
    <template v-for="(searchResult, index) in list">
      <q-separator :key="`q-sep-${index}`"></q-separator>

      <q-item :key="index" clickable v-ripple @click="goTo(searchResult)">

        <q-icon v-if="searchResult.isPerson" name="person" class="text-primary"/>
        <q-icon v-else name="medical_services" class="text-secondary"/>

        <q-item-section>
          <span v-if="!searchResult.isPerson && personPointer === null">
            {{ searchResult.personName }}/{{ searchResult.item.name }}
          </span>
          <div v-else>
            {{ searchResult.item.name }}
          </div>
        </q-item-section>

        <div v-if="searchResult.isPerson">
          <q-badge text-color="white" color="red" v-if="lookForAmount(searchResult.item.medications, 'hasForgot')">
            {{ lookForAmount(searchResult.item.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="lookForAmount(searchResult.item.medications, 'isRunningOut')">
            {{ lookForAmount(searchResult.item.medications, 'isRunningOut') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </div>

        <div v-else>
          <q-badge text-color="white" color="red" v-if="searchResult.item.hasForgot">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>

          <q-badge text-color="black" color="yellow-6" v-if="searchResult.item.isRunningOut">
            <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
          </q-badge>
        </div>

      </q-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Dialog-Layout',
  props: ['list', 'personPointer'],
  methods: {
    lookForAmount (meds, key) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          amount++
        }
      }
      return amount
    },
    showNewDialog (dialogBooleans, key) {
      this.$emit('showNewDialog', { dialogBooleans: dialogBooleans, key: key })
    },
    goTo (subject) {
      this.showNewDialog({ searchDialog: false, addPersonDialog: false, addMedicineDialog: false }, '')
      if (subject.isPerson) {
        this.$store.commit('user/changePersonPointer', subject.item.index)
        this.$router.push('/Person')
      } else {
        this.$store.commit('user/changePersonPointer', subject.personPointer)
        this.$store.commit('user/changeMedicinePointer', subject.item.index)
        this.$router.push('/Person/Medicine')
      }
    }
  }
}
</script>
