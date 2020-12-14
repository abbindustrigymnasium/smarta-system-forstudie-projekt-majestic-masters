<template>
  <q-scroll-area class="fit">
    <q-list>
      <q-item v-if="personPointer !== null && medicinePointer === null" clickable v-ripple @click="goTo('/')">
        <q-item-section avatar>
          <q-icon name="people"/>
        </q-item-section>
        <q-item-section>
          Personer
        </q-item-section>
      </q-item>

      <q-item v-if="medicinePointer !== null" clickable v-ripple @click="goTo('/Person')">
        <q-item-section avatar>
          <q-icon name="person"/>
        </q-item-section>
        <q-item-section>
          {{ name }}
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

            <div v-if="item.hasOwnProperty('id')">
              <q-badge text-color="white" color="red" v-if="lookForForgotAmount(item.medications)">
                {{ lookForForgotAmount(item.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>

              <q-badge text-color="black" color="yellow-6" v-if="lookForRunningOutAmount(item.medications)">
                {{ lookForRunningOutAmount(item.medications) }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>
            </div>

            <div v-else>
              <q-badge text-color="white" color="red" v-if="item.hasForgot">
                <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>

              <q-badge text-color="black" color="yellow-6" v-if="item.remind >= item.amount * item.interval">
                <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>
            </div>

          </q-item>
        </template>
      </q-list>

    </q-list>
  </q-scroll-area>
</template>

<script>

export default {
  name: 'Drawer',
  props: ['list', 'personPointer', 'medicinePointer', 'name'],
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
    }
  }
}

</script>
