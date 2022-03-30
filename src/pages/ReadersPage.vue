<template>
  <DeviceTable
    :headerTable="'Ридеры'"
    :rows="readersList"
    @showAntenna="isShow"
  />
  <div v-if="antennaShow">
    <DeviceTable :headerTable="'Антенны ридера'" :rows="rowsAntenna" />
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceTable from "../components/DeviceTable.vue";
import { getReaders } from "../api/index.js";

let antennaShow = ref(false);

//Данные ридера

let rowsREader;

const rowsReader = [
  {
    name: "Frozen Yogurt",
    building: 159,
    floor: 6.0,
    buildingId: "16515",
    premises: 24,
    floorId: "16515",
  },
  {
    name: "Ice cream sandwich",
    building: 237,
    floor: 9.0,
    buildingId: "16515",
    premises: 37,
    floorId: "16515",
  },
];

//Данные антенны
const rowsAntenna = [
  {
    name: "Frozen Yogurt",
    building: 159,
    floor: 6.0,
    premises: 24,
  },
  {
    name: "Ice cream sandwich",
    building: 237,
    floor: 9.0,
    premises: 37,
  },
  {
    name: "Eclair",
    building: 262,
    floor: 16.0,
    premises: 23,
  },
];

export default {
  components: {
    DeviceTable,
  },
  setup() {
    function isShow(value) {
      antennaShow.value = value;
    }

    let readersList = ref([]);

    getReaders().then((result) => (readersList.value = result));

    return {
      antennaShow,
      isShow,
      rowsAntenna,
      rowsReader,
      readersList,
    };
  },
};
</script>

<style scoped></style>
