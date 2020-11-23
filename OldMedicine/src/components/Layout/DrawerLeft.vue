<template>
  <q-drawer show-if-above :width="200" :breakpoint="200" bordered content-class="bg-grey-3">
    <q-scroll-area class="fit">
      <q-list>

        <q-item clickable v-ripple @click="home()">
          <q-item-section avatar>
            <q-icon name="people"></q-icon>
          </q-item-section>
          <q-item-section>
            Personer
          </q-item-section>
        </q-item>
        <q-separator></q-separator>

        <q-list content-class="bg-grey-3">
          <template v-for="(person, index) in people">
            <q-separator :key="`q-sep-${index}`"></q-separator>
            <q-item :key="index" clickable v-ripple @click="goToPerson(person.index)">

              <q-item-section>
                {{ person.name }}
              </q-item-section>

              <q-badge text-color="white" color="red" v-if="lookFor(person.medications, 'hasForgot')">
                {{ lookForAmount(person.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>

              <q-badge text-color="black" color="yellow-6" v-if="lookFor(person.medications, 'isRunningOut')">
                {{ lookForAmount(person.medications, 'isRunningOut') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>

            </q-item>
          </template>
        </q-list>

      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>

export default {
  name: 'DrawerLeft',
  props: ['people', 'personPointer'],
  methods: {
    home () {
      this.$router.push({ path: '/' })
    },
    goToPerson (personPointer) {
      this.$store.commit('user/changePersonPointer', personPointer)
      this.$forceUpdate()
    },
    lookForAmount (meds, key) {
      let amount = 0
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          amount++
        }
      }
      return amount
    },
    lookFor (meds, key) {
      for (let i = 0; i < meds.length; i++) {
        if (meds[i][key]) {
          return true
        }
      }
      return false
    }
  }
}

</script>
