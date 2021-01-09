<template>
  <div class="fullscreen bg-primary2 text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h1">
        404
      </div>

      <div class="text-h5" style="opacity:.5">
        Inget att see här...
      </div>

      <q-btn
        class="q-mt-md"
        color="white"
        text-color="primary1"
        unelevated
        to="/"
        label="Gå hem"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
