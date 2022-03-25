<template>
  <div class="q-pa-md q-gutter-sm" style="max-width: 350px">
    <q-list bordered separator>

      <q-item clickable v-ripple
              v-for="location in locations" :key="location.id">
<!--              v-on:click="isShow(reader)">-->
        <q-item-section>{{ location.id }}</q-item-section>
        <q-item-section>{{ location.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: "LocationList",

  props:{
    locations:  {id: String,
                 name: String}

  },

  setup(props) {

    return {

    };
  }
})

</script>

<style scoped>

</style>
