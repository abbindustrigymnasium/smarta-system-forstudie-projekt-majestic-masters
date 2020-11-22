<template>
  <div id="Dialog-Layout">
    <q-card>
      <q-input outlined v-model="key" label="Vart vill du gå?">
      </q-input>

      <q-list content-class="bg-grey-3">
        <template v-for="(searchResult, index) in searchList">
          <q-separator :key="`q-sep-${index}`"></q-separator>
          <q-item :key="index" clickable v-ripple @click="goTo()">

            <q-icon v-if="!searchResult[0]" name="person" class="text-primary"/>
            <q-icon v-else name="../assets/pills-solid.svg" class="text-secondary"/>

            <q-item-section>
              {{ searchResult[2].name }}
            </q-item-section>

            <q-item-section avatar v-if="searchResult[2].medications[0].hasForgot">
              <q-icon name="warning" class="text-red"></q-icon>
            </q-item-section>

            <q-badge text-color="black" color="yellow-6" v-if="searchResult[2].medications[0].isRunningOut">
              {{ searchResult[2].medications[0].isRunningOut }} <q-icon name="warning" class="q-ml-xs" size="14px"></q-icon>
            </q-badge>

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
          if (this.people[i].name.toLowerCase().includes(newKey)) {
            this.searchList.push([0, i, this.people[i]])
          }
        }
        if (!this.searchList.length) {
          console.log('aw no one found')
        } else {
          console.log('here yall supposed to searh lamao')
        }
      }
    }
  }
}
</script>
