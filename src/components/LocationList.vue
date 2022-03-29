<template>
  <div class="q-pa-md q-gutter-sm" style="max-width: 350px">
    <h6>Выберите {{ locationLabel }}</h6>
    <q-virtual-scroll style="max-height: 300px" :items="locationsList" separator>
      <template v-slot="{ item, index }">
        <q-item :key="index" dense>
          <q-item-section>
            <q-item-label v-on:click="changeLocation(item)">
              #{{ index }} - {{ item.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import axios from "axios";

const maxSize = 10000;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
  });
}

export default defineComponent({
  name: "LocationList",

  props: {
    locationLabel: String,
    locationName: String,
    columnNumber: String,
    locations: { id: String, name: String },
  },

  emits: ["locationChange"],

  setup(props, { emit }) {
    function changeLocation(location) {
      emit("locationChange", location, props.columnNumber);
    }

    let locationsList = ref([])
    let loc = (props.locationName).toLowerCase() + ((props.locationName).slice(-1) == 's' ? '' : 's')

    // axios.get(`http://eam.interid.ru:8764/api/${loc}/`, {
    axios.get(`http://localhost:8764/api/${loc}/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      locationsList.value = response.data;
    })

    return {
      heavyList,
      changeLocation,
      locationsList,
    };
  },
});
</script>

<style scoped></style>
