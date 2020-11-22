<template>
  <div>
  <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
        <q-toolbar-title v-if="drawer">Old Medicine</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered content-class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications"></q-icon>
            </q-item-section>
            <q-item-section>
              Notifikationer
            </q-item-section>
          </q-item>
          <q-separator></q-separator>

          <template v-for="(person, index) in people"> <!-- SORTERA PERSON EFTER NAMN OCH LÄGG TILL q-seperator DÄR EN NY FÖRSTA BOKSTAV HAMNAR -->
            <q-item :key="index" clickable v-ripple @click="goToPerson(index)">
              <q-item-section>
                {{ person.name }}
              </q-item-section>
            </q-item>
          </template>

          <q-separator></q-separator>

          <q-item clickable v-ripple @click="addPerson(makeID(10))">
            <q-item-section avatar>
              <q-icon name="add"></q-icon>
            </q-item-section>
            <q-item-section>
              Lägg till person
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
export default {
  name: 'DrawerDesktop',
  props: ['people'],
  data () {
    return {
      drawer: false
    }
  }
}
</script>
