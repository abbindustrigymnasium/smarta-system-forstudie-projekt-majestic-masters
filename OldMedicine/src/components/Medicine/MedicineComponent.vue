<template>
  <div id="Medicine-Component" class="q-ma-sm">
    <q-item class="text-primary1 text-center justify-center q-ma-sm">
      <q-item-label class="text-center row text-h5 text-weight-regular">Denna sida visar information om medicinen {{ medicine.name }} som {{ name }} tar.</q-item-label>
    </q-item>

    <div v-if="medicine.hasForgot">
      <q-item-label class="text-negative text-left row text-h6 text-weight-regular">Varning!</q-item-label>
      <p class="text-body1 text-negative q-mb-none">{{ name }} har glömt att ta sin medicin.</p>
      <p class="text-subtitle2">Glömd dosering var den {{ missedDose }}.</p>
    </div>
    <div v-else>
      <q-item-label class="text-positive text-left row text-h6 text-weight-regular">Va bra!</q-item-label>
      <p class="text-body1 text-positive q-mb-none">{{ name }} har tagit sin medicin.</p>
      <p class="text-subtitle2">Nästa dosering sker den {{ nextDose }}.</p>
    </div>

    <div v-if="medicine.amount == 0">
      <q-item-label class="text-negative text-left row text-h6 text-weight-regular">Varning!</q-item-label>
      <p class="text-body1 text-negative q-mb-none">Påfyllning krävs omedelbart.</p>
      <p class="text-subtitle2">{{ name }} har slut på {{ medicine.name }}.</p>
    </div>
    <div v-else-if="medicine.remind < medicine.amount * medicine.interval">
      <q-item-label class="text-positive text-left row text-h6 text-weight-regular">Va bra!</q-item-label>
      <p class="text-body1 text-positive q-mb-none">{{ name }} har tillräckligt med medicin.</p>
      <p class="text-subtitle2">{{ name }} har kvar {{ medicine.amount }} tabletter av {{ medicine.name }}. Vilket räcker tills {{ sufficientTo }}. Rekomenderad påfyllning är den {{ recomendedBuy }}.</p>
    </div>
    <div v-else>
      <q-item-label class="text-warning text-left row text-h6 text-weight-regular">Varning! </q-item-label>
      <p class="text-body1 text-warning q-mb-none">Påfyllning är försenad.</p>
      <p class="text-subtitle2">{{ name }} har endast {{ medicine.amount }} {{ tabletter }} kvar, {{ name }} kommer få slut på {{ medicine.name }} den {{ sufficientTo }}.</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Person-Component',
  props: ['medicine', 'name'],
  data () {
    return {
      tabletter: 'tabletter'
    }
  },
  mounted () {
    if (this.medicine.amount === 1) {
      this.tabletter = 'tablett'
    }
  },
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
    },
    timeOfDayToConsumeMeds (unixTime, unixTimeConsume) {
      var a = new Date(unixTime)
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()

      var b = new Date(unixTimeConsume)
      var hour = b.getHours()
      var min = b.getMinutes()
      return date + ' ' + month + ' ' + year + ' klockan ' + hour.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0')
    }
  },
  computed: {
    sufficientTo: function () {
      return this.timeOfDayToConsumeMeds((new Date()).getTime() + this.medicine.amount * this.medicine.interval, this.medicine.startTime)
    },
    recomendedBuy: function () {
      return this.timeOfDayToConsumeMeds((new Date()).getTime() + this.medicine.amount * this.medicine.interval - this.medicine.remind, this.medicine.startTime)
    },
    nextDose: function () {
      return this.timeOfDayToConsumeMeds((new Date()).getTime() + this.medicine.interval, this.medicine.startTime)
    },
    missedDose: function () {
      return this.timeOfDayToConsumeMeds((new Date()).getTime() - this.medicine.interval, this.medicine.startTime)
    }
  }
}
</script>
