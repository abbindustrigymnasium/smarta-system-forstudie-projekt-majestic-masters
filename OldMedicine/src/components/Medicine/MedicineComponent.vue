<template>
  <div id="Medicine-Component">
    <q-item class="text-primary1 text-center">
      <q-item-label class="text-center row text-h5 text-weight-regular">Denna sida visar information om medicinen {{ medicine.name }} som {{ name }} tar.</q-item-label>
    </q-item>

    <div v-if="medicine.hasForgot">
      <q-item-label class="text-negative text-left row text-h6 text-weight-regular">Varning!</q-item-label>
      <p class="text-subtitle1">{{ name }} har glömt att ta sin medicin.</p>
    </div>
    <div v-else>
      <p class="text-subtitle1">{{ name }} har tagit sin medicin.</p>
    </div>

    <div v-if="!medicine.amount">
      <q-item-label class="text-negative text-left row text-h6 text-weight-regular">Varning!</q-item-label>
      <p class="text-body1 text-negative">Påfyllning krävs omedelbart.</p>
      <p class="text-subtitle1">{{ name }} har slut på {{ medicine.name }}.</p>
    </div>
    <div v-else-if="medicine.remind < time">
      <p class="text-subtitle1">{{ name }} har kvar {{ medicine.amount }} tabletter av {{ medicine.name }}. Vilket räcker tills {{ räckerTill }}. Rekomenderad påfyllning är den {{ rekomenderatKöp }}.</p>
    </div>
    <div v-else>
      <q-item-label class="text-warning text-left row text-h6 text-weight-regular">Varning! </q-item-label>
      <p class="text-body1 text-warning q-pb-none q-mb-none">Påfyllning är försenad.</p>
      <p class="text-subtitle1">{{ name }} kommer få slut på {{ medicine.name }} den {{ räckerTill }}.</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Person-Component',
  props: ['medicine', 'name'],
  methods: {
    timeToDate (unixTime) {
      var a = new Date(unixTime)
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      return date + ' ' + month + ' ' + year + ' klockan ' + hour.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0')
    }
  },
  computed: {
    räckerTill: function () {
      return this.timeToDate((new Date()).getTime() + this.medicine.amount * this.medicine.interval)
    },
    rekomenderatKöp: function () {
      return this.timeToDate((new Date()).getTime() + this.medicine.amount * this.medicine.remind)
    }
  }
}
</script>
