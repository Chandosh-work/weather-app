<template>
   <q-page class="flex column">
      <div class="row">
        <q-btn class="row " flat color="white" @click="goBack">
          <q-icon left size="3em" name="arrow_back" />
          <!-- <div>Go Back</div> -->
        </q-btn>
        <div color="white" class="row justify-center text-white text-h4  q-my-sm"> Weather Map </div>
      </div>
      <google-map-npm />
      <!-- <google-map/> -->
     
   </q-page>
</template>

<script>

export default {
  
components: {
    'google-map-npm': require('components/GoogleMapNpm.vue').default,
    'google-map': require('components/GoogleMap.vue').default
  },
  data () {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-page {
    background: linear-gradient(to bottom, #136a8a, #267871);
  }

</style>
