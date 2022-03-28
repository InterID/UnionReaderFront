<template>
  <div class="q-pa-md q-gutter-sm" style="max-width: 350px">
    <h6>Выберите {{locationName}}</h6>
    <q-virtual-scroll
      style="max-height: 300px;"
      :items="heavyList"
      separator
    >
      <template v-slot="{ item, index }">
        <q-item
          :key="index"
          dense
        >
          <q-item-section>
            <q-item-label v-on:click="changeLocation(item.label)">
              #{{ index }} - {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1)
  })
}

export default defineComponent({
  name: "LocationList",

   props:{
     locationName: String,
     columnNumber:String,
     locations:  {id: String,
                  name: String}

   },

  emits: ["locationChange"],

  setup(props, { emit }) {

    function changeLocation(location){
      console.log("inList",location)
      console.log("inList",props.columnNumber)
      emit("locationChange", location, props.columnNumber);

    }

    return {
      heavyList,
      changeLocation
    };
  }
})




</script>


<style scoped>

</style>
