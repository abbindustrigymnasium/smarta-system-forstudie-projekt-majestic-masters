<template>
  <div id="Dialog-Layout">
    <q-card>
      <q-input outlined v-model="key" label="Vart vill du gå?">
      </q-input>

      <q-list content-class="bg-grey-3">
        <template v-for="(searchResult, index) in searchList">
          <q-separator :key="`q-sep-${index}`"></q-separator>
          <q-item :key="index" clickable v-ripple @click="goTo(searchResult)">

            <q-icon v-if="searchResult.isPerson" name="person" class="text-primary"/>
            <q-icon v-else name="medical_services" class="text-secondary"/>
            <!-- <q-icon v-else name="../assets/pills-solid.svg" class="text-secondary"/> -->

            <q-item-section>
              {{ searchResult.item.name }}
            </q-item-section>

            <div v-if="searchResult.isPerson">
              <q-badge text-color="white" color="red" v-if="lookFor(searchResult.item.medications, 'hasForgot')">
                {{ lookForAmount(searchResult.item.medications, 'hasForgot') }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
              </q-badge>

              <q-badge text-color="black" color="yellow-6" v-if="lookFor(searchResult.item.medications, 'isRunningOut')">
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
      </q-list>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'Dialog-Layout-Search',
  props: ['people'],
  data () {
    return {
      key: '',
      searchList: []
    }
  },
  watch: {
    key: function (newKey, oldKey) {
      this.searchList = []
      if (newKey !== '') {
        for (var i = 0; i < this.people.length; i++) {
          for (var q = 0; q < this.people[i].medications.length; q++) {
            if (this.people[i].medications[q].name.toLowerCase().includes(newKey)) {
              this.searchList.push({ isPerson: false, item: this.people[i].medications[q], personPointer: this.people[i].index })
            }
          }
          if (this.people[i].name.toLowerCase().includes(newKey)) {
            this.searchList.push({ isPerson: true, item: this.people[i] })
          }
        }
        if (!this.searchList.length) {
          console.log('aw no one found')
        }
      }
    }
  },
  methods: {
    goTo (searchResult) {
      if (searchResult.isPerson) {
        this.$store.commit('user/changePersonPointer', searchResult.item.index)
        this.$router.push('/Person')
      } else {
        console.log(searchResult)
        this.$store.commit('user/changePersonPointer', searchResult.personPointer)
        this.$store.commit('user/changeMedicinePointer', searchResult.item.index)
        this.$router.push('/Person/Medicine')
      }
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
