<template>
  <q-scroll-area class="fit">
    <q-list>

      <q-item v-if="personPointer !== null" clickable v-ripple @click="goTo('/')">
        <q-item-section avatar>
          <q-icon name="people"/>
        </q-item-section>
        <q-item-section>
          Personer
        </q-item-section>
      </q-item>

      <q-item v-else clickable v-ripple @click="goTo('/People')">
        <q-item-section avatar>
          <q-icon name="medical_services"/>
        </q-item-section>
        <q-item-section>
          Mediciner
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-list content-class="bg-grey-3">
        <template v-for="(item, index) in list">
          <q-separator :key="`q-sep-${index}`"></q-separator>
          <q-item :key="index" clickable v-ripple @click="changeRoute(index)" v-bind:class="{'bg-grey-4':(index === personPointer || index === medicinePointer)}">

            <q-icon v-if="personPointer !== null" name="person" class="text-primary"/>
            <q-icon v-else name="medical_services" class="text-secondary"/>

            <q-item-section>
              {{ item.name }}
            </q-item-section>

            <!-- <q-badge v-if="personPointer !== null && lookFor(item.medications, 'hasForgot')" text-color="white" color="red">
              {{ lookForAmount(item.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

            <q-badge v-else-if="lookFor(item, 'hasForgot')" text-color="white" color="red">
              {{ lookForAmount(item.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

            <q-badge v-if="personPointer !== null && lookFor(person.medications, 'isRunningOut')" text-color="black" color="yellow-6">
              {{ lookForAmount(item.medications, 'isRunningOut') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

            <q-badge v-else-if="lookFor(item, 'isRunningOut')" text-color="black" color="yellow-6">
              {{ lookForAmount(item.medications, 'isRunningOut') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge> -->

          </q-item>
        </template>
      </q-list>

    </q-list>
  </q-scroll-area>
</template>

<script>

export default {
  name: 'Drawer',
  props: ['list', 'personPointer', 'medicinePointer'],
  methods: {
    goTo (where) {
      this.$router.push({ path: where })
    },
    changeRoute (index) {
      if (this.personPointer !== null) {
        this.goToPerson(index)
      } else {
        this.goToMedicine(index)
      }
    },
    goToPerson (personPointer) {
      this.$store.commit('user/changePersonPointer', personPointer)
      this.$router.push({ path: '/Person' }).catch(() => {})
    },
    goToMedicine (medicinePointer) {
      this.$store.commit('user/changeMedicinePointer', medicinePointer)
      this.$router.push({ path: '/Person/Medicine' }).catch(() => {})
    },
    lookForAmount (meds, key) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          amount++
        }
      }
      return amount
    }
  }
}

</script>
