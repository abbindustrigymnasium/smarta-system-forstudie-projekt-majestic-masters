<template>
  <div id="Medicine-Component">
    {{ medicine }}
    <p class="text-subtitle1">Denna sida visar information om medicinen {{ medicine.name }} som {{ name }} tar.</p>
    <p v-if="medicine.hasForgot" class="text-subtitle1">{{ name }} har glömt att ta sin medicin.</p>
    <p v-else class="text-subtitle1">{{ name }} har tagit sin medicin.</p>

    <p v-if="!medicine.amount" class="text-subtitle1">{{ name }} har slut på {{ medicine.name }}.</p>
    <p v-else-if="medicine.remind < time" class="text-subtitle1">{{ medicine.name }} räcker i {{ time }}.</p>
    <p v-else class="text-subtitle1">{{ name }} kommer få slut på {{ medicine.name }} om {{ time }}.</p>

  </div>
</template>

<script>

export default {
  name: 'Person-Component',
  props: ['medicine', 'name'],
  computed: {
    time: function () {
      return this.medicine.amount * this.medicine.interval
    }
  }
}
</script>
